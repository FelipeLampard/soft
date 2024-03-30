import { Router } from "express";
import { allPostPaginator, createPost, deletePost, filterPosts, getAllPostsHateos, getAllpost, getAllpostlimit, getOrderAndLimitsPosts, updatePost } from "../../src/controllers/title.controller.js"
import { isLogin } from "../../middlewares/Login.js";
const router = Router();

router.post('/joyas', createPost);
router.get('/joyas', isLogin, getAllpost ); 
router.put('/joyas/:id', updatePost);
router.delete('/joyas/:id', deletePost);
router.get('/joyas_with_limit', getAllpostlimit);
router.get('/joyas_with_limit_and_order', getOrderAndLimitsPosts);
router.get('/joyas_with_hateoas', getAllPostsHateos);
router.get('/joyas_with_pagination', allPostPaginator);
router.get('/joyas_with_filter', filterPosts);

export default router;