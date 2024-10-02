import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 h-screen">
            <Container>
                <div className="flex flex-col md:flex-row mb-4 border rounded-xl p-2">
                    {/* Image Section */}
                    <div className="relative md:w-1/2 flex justify-center mb-4 md:mb-0">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl w-full h-auto max-w-[600px] transition-transform duration-300 transform hover:scale-105" // Increased size and added hover effect
                        />
                        {isAuthor && (
                            <div className="absolute right-6 top-6 flex space-x-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="transition duration-200 hover:bg-green-600 rounded-lg">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost} className="transition duration-200 hover:bg-red-600 rounded-lg">
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="md:w-1/2 flex flex-col justify-center pl-4">
                        <h1 className="text-2xl font-bold text-[#16423C] mb-4">{post.title}</h1>
                        <div className="browser-css text-[#16423C]">
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
