import express from 'express';
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
} from '../controllers/propertyCtrl';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authenticate, createProperty);
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
router.put('/:id', authenticate, updateProperty);
router.delete('/:id', authenticate, deleteProperty);

export default router;
