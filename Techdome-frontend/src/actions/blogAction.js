import {
    ADD_BLOG,
    BLOG_REQUEST,
    BLOG_SUCCESS,
    ADD_NEW_BLOG,
    DEL_BLOG,
    UPDATE_NEW_BLOG,
} from "../constants/blogConstants";
import axiosNew from "../apiConfig/api";

// Action to add a new blog
export const addBlog = (data) => async (dispatch) => {
    try {
        const res = await axiosNew.post("/add_blog", data);
        dispatch({ type: ADD_NEW_BLOG, payload: res.data.blog });
    } catch (error) {
        console.error("Error adding blog:", error.response || error.message);
    }
};

// Action to update a blog
export const updateBlog = (data) => async (dispatch) => {
    try {
        const res = await axiosNew.post("/update_blog", data);
        dispatch({ type: UPDATE_NEW_BLOG, payload: res.data.newBlog });
    } catch (error) {
        console.error("Error updating blog:", error.response || error.message);
    }
};

// Action to delete a blog
export const deleteBlog = (id) => async (dispatch) => {
    try {
        const res = await axiosNew.delete(`/delete_blog/${id}`);
        dispatch({ type: DEL_BLOG, payload: id });
    } catch (error) {
        console.error("Error deleting blog:", error.response || error.message);
    }
};

