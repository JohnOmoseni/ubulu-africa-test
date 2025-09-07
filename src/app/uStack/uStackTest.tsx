"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Play, Plus, Trash2, BookOpen, Users, Award } from "lucide-react";

interface Video {
	id: string;
	name: string;
	description: string;
	youtubeId: string;
}

export default function VideoLearningPlatform() {
	const [videos, setVideos] = useState<Video[]>([
		{
			id: "1",
			name: "Introduction to React",
			description:
				"Learn the fundamentals of React including components, props, and state management.",
			youtubeId: "dQw4w9WgXcQ",
		},
		{
			id: "2",
			name: "Advanced JavaScript Concepts",
			description:
				"Deep dive into closures, promises, async/await, and modern ES6+ features.",
			youtubeId: "dQw4w9WgXcQ",
		},
	]);

	const [currentVideo, setCurrentVideo] = useState<Video | null>(
		videos[0] || null
	);
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		youtubeUrl: "",
	});

	const extractYouTubeId = (url: string): string => {
		const regex =
			/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
		const match = url.match(regex);
		return match ? match[1] : "";
	};

	const handleAddVideo = (e: React.FormEvent) => {
		e.preventDefault();
		const youtubeId = extractYouTubeId(formData.youtubeUrl);

		if (!formData.name || !formData.description || !youtubeId) {
			alert("Please fill in all fields with a valid YouTube URL");
			return;
		}

		const newVideo: Video = {
			id: Date.now().toString(),
			name: formData.name,
			description: formData.description,
			youtubeId,
		};

		setVideos([...videos, newVideo]);
		setFormData({ name: "", description: "", youtubeUrl: "" });

		if (!currentVideo) {
			setCurrentVideo(newVideo);
		}
	};

	const handleDeleteVideo = (id: string) => {
		const updatedVideos = videos.filter((video) => video.id !== id);
		setVideos(updatedVideos);

		if (currentVideo?.id === id) {
			setCurrentVideo(updatedVideos[0] || null);
		}
	};

	const handleWatchVideo = (video: Video) => {
		setCurrentVideo(video);
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<header className="border-b border-border bg-card">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
								<BookOpen className="w-5 h-5 text-primary-foreground" />
							</div>
							<h1 className="text-2xl font-bold text-foreground">
								EduLearn AI
							</h1>
						</div>
						<div className="flex items-center space-x-6 text-sm text-muted-foreground">
							<div className="flex items-center space-x-1">
								<Users className="w-4 h-4" />
								<span>1,247 Students</span>
							</div>
							<div className="flex items-center space-x-1">
								<Award className="w-4 h-4" />
								<span>AI-Powered Learning</span>
							</div>
						</div>
					</div>
				</div>
			</header>

			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Video Player Section */}
					<div className="lg:col-span-2">
						<Card className="mb-6">
							<CardHeader>
								<CardTitle className="text-balance">
									{currentVideo
										? currentVideo.name
										: "Select a Video to Start Learning"}
								</CardTitle>
								{currentVideo && (
									<CardDescription className="text-pretty">
										{currentVideo.description}
									</CardDescription>
								)}
							</CardHeader>
							<CardContent>
								{currentVideo ? (
									<div className="aspect-video w-full">
										<iframe
											src={`https://www.youtube.com/embed/${currentVideo.youtubeId}`}
											title={currentVideo.name}
											className="w-full h-full rounded-lg"
											allowFullScreen
										/>
									</div>
								) : (
									<div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
										<div className="text-center">
											<Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
											<p className="text-muted-foreground">No video selected</p>
										</div>
									</div>
								)}
							</CardContent>
						</Card>

						{/* Add Video Form */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Plus className="w-5 h-5" />
									<span>Add New Video</span>
								</CardTitle>
								<CardDescription>
									Add a new learning video to your collection
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form onSubmit={handleAddVideo} className="space-y-4">
									<div>
										<Label htmlFor="name">Video Name</Label>
										<Input
											id="name"
											value={formData.name}
											onChange={(e) =>
												setFormData({ ...formData, name: e.target.value })
											}
											placeholder="Enter video title"
											className="mt-1"
										/>
									</div>
									<div>
										<Label htmlFor="description">Description</Label>
										<Textarea
											id="description"
											value={formData.description}
											onChange={(e) =>
												setFormData({
													...formData,
													description: e.target.value,
												})
											}
											placeholder="Describe what this video covers"
											className="mt-1"
											rows={3}
										/>
									</div>
									<div>
										<Label htmlFor="youtubeUrl">YouTube URL</Label>
										<Input
											id="youtubeUrl"
											value={formData.youtubeUrl}
											onChange={(e) =>
												setFormData({ ...formData, youtubeUrl: e.target.value })
											}
											placeholder="https://www.youtube.com/watch?v=..."
											className="mt-1"
										/>
									</div>
									<Button type="submit" className="w-full">
										<Plus className="w-4 h-4 mr-2" />
										Add Video
									</Button>
								</form>
							</CardContent>
						</Card>
					</div>

					{/* Video List Sidebar */}
					<div>
						<Card>
							<CardHeader>
								<CardTitle>Learning Videos</CardTitle>
								<CardDescription>
									{videos.length} video{videos.length !== 1 ? "s" : ""}{" "}
									available
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								{videos.length === 0 ? (
									<div className="text-center py-8">
										<BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
										<p className="text-muted-foreground">No videos added yet</p>
										<p className="text-sm text-muted-foreground">
											Add your first video to get started
										</p>
									</div>
								) : (
									videos.map((video) => (
										<div
											key={video.id}
											className={`p-4 rounded-lg border transition-colors ${
												currentVideo?.id === video.id
													? "border-primary bg-primary/5"
													: "border-border hover:border-primary/50"
											}`}
										>
											<h3 className="font-semibold text-sm mb-2 text-balance">
												{video.name}
											</h3>
											<p className="text-xs text-muted-foreground mb-3 text-pretty line-clamp-2">
												{video.description}
											</p>
											<div className="flex space-x-2">
												<Button
													size="sm"
													onClick={() => handleWatchVideo(video)}
													className="flex-1"
													variant={
														currentVideo?.id === video.id
															? "secondary"
															: "default"
													}
												>
													<Play className="w-3 h-3 mr-1" />
													{currentVideo?.id === video.id ? "Playing" : "Watch"}
												</Button>
												<Button
													size="sm"
													variant="outline"
													onClick={() => handleDeleteVideo(video.id)}
													className="text-destructive hover:text-destructive"
												>
													<Trash2 className="w-3 h-3" />
												</Button>
											</div>
										</div>
									))
								)}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
