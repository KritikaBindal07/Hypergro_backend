import { Request, Response } from "express";
import Property from "../models/property";
import mongoose from "mongoose";
import User from "../models/user";

export const recommendProperty = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.user)
    return res.status(401).json({ message: "User not authenticated" });

  const { recipientId, propertyId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(recipientId) ||
    !mongoose.Types.ObjectId.isValid(propertyId)
  ) {
    return res
      .status(400)
      .json({ message: "Invalid recipient or property ID" });
  }

  try {
 
    const recipient = await User.findById(recipientId);
    if (!recipient)
      return res.status(404).json({ message: "Recipient user not found" });

    
    const property = await Property.findById(propertyId);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    // Add recommendation 
    recipient.recommendationsReceived.push({
      property: property._id as mongoose.Types.ObjectId,
      recommendedBy: req.user._id as mongoose.Types.ObjectId,
    });

    await recipient.save();

    return res
      .status(200)
      .json({ message: "Property recommended successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error recommending property", error });
  }
};

export const getRecommendationsReceived = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.user)
    return res.status(401).json({ message: "User not authenticated" });

  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "recommendationsReceived.property",
        model: "Property",
      })
      .populate({
        path: "recommendationsReceived.recommendedBy",
        model: "User",
        select: "email",
      });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    return res
      .status(200)
      .json(user.recommendationsReceived);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching recommendations", error });
  }
};
