"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { useCreateProduct, useUpdateProduct } from "@/hooks/useProducts";

type Props = {
	onSuccess?: () => void;
	trigger?: React.ReactNode;
	initialData?: any;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

export default function ProductForm({
	onSuccess,
	trigger,
	initialData,
	open: openProp,
	onOpenChange,
}: Props) {
	const [internalOpen, setInternalOpen] = useState(false);
	const isControlled = typeof openProp !== "undefined";
	const open = isControlled ? (openProp as boolean) : internalOpen;
	const setOpen = (v: boolean) => {
		if (isControlled) onOpenChange?.(v);
		else setInternalOpen(v);
	};

	const [title, setTitle] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");

	const createProduct = useCreateProduct();
	const updateProduct = useUpdateProduct();

	// Prefill dialog when opening in edit
	React.useEffect(() => {
		if (open && initialData) {
			setTitle(initialData.title ?? "");
			setPrice(
				initialData.price !== undefined ? String(initialData.price) : ""
			);
			setDescription(initialData.description ?? "");
			setCategory(initialData.category ?? "");
		}
		if (!open && !initialData) {
			// clear when closing the dialog
			setTitle("");
			setPrice("");
			setDescription("");
			setCategory("");
		}
	}, [open, initialData]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const payload = {
			title,
			price: parseFloat(price),
			description,
			category,
		};

		if (initialData && initialData.id) {
			// update
			updateProduct.mutate(
				{ id: initialData.id, payload },
				{
					onSuccess: () => {
						setOpen(false);
						if (onSuccess) onSuccess();
						// clear local fields after edit
						setTitle("");
						setPrice("");
						setDescription("");
						setCategory("");
					},
				}
			);
			return;
		}

		// create product
		createProduct.mutate(payload, {
			onSuccess: () => {
				setTitle("");
				setPrice("");
				setDescription("");
				setCategory("");
				setOpen(false);
				if (onSuccess) onSuccess();
			},
		});
	};

	const submitting =
		createProduct.status === "pending" || updateProduct.status === "pending";

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{trigger ?? <Button>Add Product</Button>}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{initialData ? "Edit Product" : "Add Product"}
					</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
					<Input
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
					<Input
						placeholder="Price"
						type="number"
						min="0"
						step="0.01"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						required
					/>
					<Input
						placeholder="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
					<Input
						placeholder="Category"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						required
					/>

					<DialogFooter>
						<DialogClose asChild>
							<Button variant="ghost">Cancel</Button>
						</DialogClose>
						<Button type="submit" disabled={submitting}>
							{submitting
								? initialData
									? "Saving..."
									: "Adding..."
								: initialData
								? "Save"
								: "Add Product"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
