import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowBack } from "@/constants/icons";
import CustomIcon from "@/components/reuseables/CustomIcon";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const PostDetails = () => {
	const navigate = useNavigate();
	const post: any = {};

	return (
		<main className="px-[5%] mt-8 lg:mt-14">
			<Helmet>
				{/* Open Graph Tags */}
				<meta property="og:title" content={post?.title} />
				<meta property="og:description" content={post?.body} />
				{/* <meta property="og:url" content={blogUrl} /> */}
				{/* <meta property="og:image" content={post?.banner} /> */}
				<meta property="og:type" content="article" />

				{/* Twitter Card Tags */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={post?.title} />
				<meta name="twitter:description" content={post?.body} />
				{/* <meta name="twitter:image" content={post?.banner} /> */}
			</Helmet>

			<div className="flex-column gap-6">
				<button onClick={() => navigate(-1)} className="row-flex gap-2 mb-5">
					<CustomIcon icon={ArrowBack} />
					<span>Go back</span>
				</button>

				<section className="row-flex-btwn gap-8 relative">
					<section className="lg:w-3/4 ">
						<img
							className="w-full h-fit max-h-[533px] rounded-[24px] "
							src={post?.banner!}
							alt="blog"
						/>
						<h1 className="lg:text-[32px] xl:text-[42px] font-semibold my-4">
							{post?.title}
						</h1>
						<div className="flex gap-4 items-center mt-3 mb-4">
							<span className="text-base text-[#424242]">{post?.author}</span>
							<span className="bg-primary w-[0.6px] h-4" />
							<span className="text-base text-[#424242]">
								{/* {timeAgo(data?.data?.published_at)} */}
							</span>
						</div>

						<section id={post?.id.toString()}>
							<PreviewTextEditor value={post?.body} />
						</section>
					</section>
				</section>
			</div>

			<Sidebar />
		</main>
	);
};

export default PostDetails;

const Sidebar = () => {
	return (
		<aside className="hidden lg:w-1/4 lg:block ">
			<div className="border border-[#EAECF0] rounded-[20px] ">
				<div className="bg-[#493452] h-[100px] w-full rounded-t-[20px] " />
				<div className="flex items-baseline xl:items-end px-5 -mt-12 xl:-mt-9 gap-3">
					<img
						src="/icons/blo.svg"
						className="lg:w-[38%] xl:w-[50%] max-w-[129px] h-auto"
					/>

					<div className="flex-column">
						<h3 className="">Ubulu Africa</h3>
						<span className="italic text-xs text-grey">
							The best learning content is waiting for you
						</span>
					</div>
				</div>
				<div className="px-4 py-8">
					<p className="font-medium text-sm pb-3">
						Follow us on social media for updates and news.{" "}
					</p>
					<div className="row-flex-btwn">
						<a target="_blank" href={"#"}></a>
						<a target="_blank" href={"#"}></a>
						<a target="_blank" href={"#"}></a>
						<a
							target="_blank"
							href={"#"}
							// className="p-2 bg-[#F8F8F8] rounded-[8px]"
						></a>
					</div>
				</div>
			</div>
		</aside>
	);
};

const PreviewTextEditor = ({ value }: { value: string }) => {
	return <ReactQuill theme="bubble" value={value} readOnly />;
};
