import express from 'express';
import {
  handleAddQuery,
  handleUpdateQuery,
  getStudentQueries,
  getAllQueries,
  handleDeleteQuery,
} from '../controllers/query.controller.js';

const router = express.Router();

router 
  .route("/")
  .get(getAllQueries)
  .patch(handleUpdateQuery)
  .delete(handleDeleteQuery)
  .post(handleAddQuery);

router.route("/student/:studentId").get(getStudentQueries);

export default router;