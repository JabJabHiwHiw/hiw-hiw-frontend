"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SelectCategory from "../../_components/SelectCategory";
import { InputIngredientTable } from "../../_components/InputIngredientTable";
import NumberOfServing from "../../_components/NumberOfServing";
import { InputRecipe } from "../../_components/InputRecipe";
import Image from "next/image";
import axios from "axios";
import type { RequireIngredient, Step } from "@/app/types";
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import getMenu from "@/lib/getMenu";

export default function CreateMenu() {
	const { user } = useUser();
	const { mid } = useParams();
	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [steps, setSteps] = useState<Step[]>([]);
	const [description, setDescription] = useState("");
	const [servings, setServings] = useState<number>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [requiredIngredients, setRequiredIngredients] = useState<
		RequireIngredient[]
	>([]);
	const [imageUrl, setImageUrl] = useState<string>(
		"https://utfs.io/f/Rik3NdCrElaD7sKaSFBM2XYUtdbmOQz1iZwSvlJMNngGoR6E",
	);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const menu = await getMenu(mid.toString());
			setName(menu.item.name);
			setCategory(menu.item.category);
			setSteps(menu.item.steps);
			setDescription(menu.item.description);
			setServings(menu.item.servings);
			setRequiredIngredients(menu.item.ingredients);
			setImageUrl(menu.item.image_url);
		};
		fetchData().then(() => {
			setIsLoading(false);
		});
	}, [mid]);

	const router = useRouter();
	const submitHandler = () => {
		if (name === "" || category === "" || steps.length === 0 || !user) return;
		axios
			.put("http://137.184.249.83/food/menu/", {
				name: name,
				description: description,
				category: category,
				ingredients: requiredIngredients,
				servings: servings,
				created_by: user.id,
				steps: steps,
				image_url: imageUrl,
                id: mid
			})
			.then((response) => {
				console.log(response.data);
				router.push(`/menu/${response.data.item.id}`);
			});
	};

	if (isLoading) {
		return <p>Menu is loading ...</p>;
	}

	return (
		<div className="flex flex-col items-left p-16 space-y-12">
			<h1 className="h1 font-bold">Update Menu</h1>

			<div className="flex flex-col space-y-6">
				<h3 className="h3 font-bold">Menu Name</h3>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className=" w-full border-4 border-gray-90 rounded-full p-1 pl-4 focus:outline-none focus:border-gray-100"
					placeholder="Enter Name"
				/>
			</div>

			<div className="flex flex-col space-y-6">
				<h3 className="h3 font-bold">Description</h3>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className=" w-full border-4 border-gray-90 rounded-lg p-1 pl-4 focus:outline-none focus:border-gray-100 min-h-[100px]"
					placeholder="Enter Description"
				/>
			</div>

			<div className="flex flex-col space-y-6">
				<h3 className="h3 font-bold">Category</h3>
				<SelectCategory setCategory={setCategory} value={category} />
			</div>
			<div className="flex flex-col space-y-6">
				<div className="relative w-full h-[400px]">
					<Image
						alt="Uploaded Image"
						src={imageUrl || ""}
						layout="fill"
						objectFit="cover"
						className="rounded-xl transition duration-500 ease-out blur-0"
					/>
				</div>
			</div>

			<div className="flex flex-col space-y-6">
				<h3 className="h3 font-bold">Ingredients</h3>
				<NumberOfServing
					variant="withButtons"
					setServings={setServings}
					value={servings}
				/>
				<InputIngredientTable setRequiredIngredients={setRequiredIngredients} ingredients={requiredIngredients} />
			</div>

			<div className="flex flex-col space-y-6">
				<h3 className="h3 font-bold">Recipe</h3>
				{steps && <InputRecipe setSteps={setSteps} step={steps} />}
			</div>

			<div className="flex gap-4">
				<Button variant="discard" className="w-1/2">
					Discard
				</Button>
				<Button variant="yellow" className="w-1/2" onClick={submitHandler}>
					Update Menu
				</Button>
			</div>
		</div>
	);
}
