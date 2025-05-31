import { Request, Response } from "express";
import Property from "../models/property";
import mongoose from "mongoose";
import User from "../models/user";
import redisClient from "../config/redis";

export const addToFavorites = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.user)
    return res.status(401).json({ message: "User not authenticated" });

  const { propertyId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ message: "Invalid property ID" });
    }

    //   if (req.user.favorites.includes(propertyId)) {
    //     return res.status(400).json({ message: 'Property already in favorites' });
    //   }
    if (req.user.favorites.map((fav) => fav.toString()).includes(propertyId)) {
      return res.status(400).json({ message: "Property already in favorites" });
    }

    req.user.favorites.push(new mongoose.Types.ObjectId(propertyId));
    await req.user.save();
    await redisClient.del(`favorites:${req.user._id.toString()}`);

    return res.status(200).json({ message: "Property added to favorites" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error adding to favorites", error });
  }
};

export const getFavorites = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.user)
    return res.status(401).json({ message: "User not authenticated" });
  const userId = req.user._id.toString();
  const cacheKey = `favorites:${userId}`;

  try {
    const cachedFavorites = await redisClient.get(cacheKey);
    if (cachedFavorites) {
      return res.status(200).json(JSON.parse(cachedFavorites));
    }
    const favorites = await Property.find({
      _id: { $in: req.user.favorites },
    });
    await redisClient.set(cacheKey, JSON.stringify(favorites), { EX: 300 });
    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching favorites", error });
  }
};

export const removeFromFavorites = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.user)
    return res.status(401).json({ message: "User not authenticated" });

  const { propertyId } = req.params;

  try {
    req.user.favorites = req.user.favorites.filter(
      (favId: mongoose.Types.ObjectId) => favId.toString() !== propertyId
    );
    await req.user.save();
    await redisClient.del(`favorites:${req.user._id.toString()}`);

    return res.status(200).json({ message: "Property removed from favorites" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error removing from favorites", error });
  }
};
