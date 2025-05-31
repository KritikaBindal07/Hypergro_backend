import { Request, Response } from "express";
import Property from "../models/property";
import mongoose from "mongoose";
import redisClient from "../config/redis";

export const createProperty = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const newProperty = new Property({
      ...req.body,
      createdBy: req.user._id,
    });

    await newProperty.save();

    //list changed (del all)
    await redisClient.del("properties:all");

    return res.status(201).json(newProperty);
  } catch (error) {
    return res.status(500).json({ message: "Error creating property", error });
  }
};

export const getAllProperties = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    
    const filters = { ...req.query };
    const cacheKey = `properties:all:${JSON.stringify(filters)}`;

   
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.status(200).json(JSON.parse(cached));
    }

    
    const properties = await Property.find(filters);

    
    await redisClient.set(cacheKey, JSON.stringify(properties), { EX: 300 });

    return res.status(200).json(properties);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching properties", error });
  }
};

export const getPropertyById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const cacheKey = `property:${req.params.id}`;

    
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.status(200).json(JSON.parse(cached));
    }

   
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

  
    await redisClient.set(cacheKey, JSON.stringify(property), { EX: 300 });

    return res.status(200).json(property);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching property", error });
  }
};

export const updateProperty = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this property" });
    }

    Object.assign(property, req.body);
    await property.save();

   
    await redisClient.del(`property:${req.params.id}`);
    await redisClient.del("properties:all"); 

    return res.status(200).json(property);
  } catch (error) {
    return res.status(500).json({ message: "Error updating property", error });
  }
};

export const deleteProperty = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this property" });
    }

    await property.deleteOne();

    // Invalidate caches
    await redisClient.del(`property:${req.params.id}`);
    await redisClient.del("properties:all");

    return res.status(200).json({ message: "Property deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting property", error });
  }
};
