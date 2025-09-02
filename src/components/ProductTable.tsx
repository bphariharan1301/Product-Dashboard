"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import {
	useProducts,
	useDeleteProduct,
	useCategories,
} from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductForm from "@/components/ProductForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

function renderPagination({ page, setPage, total, limit, skip }: any) {
	const totalPages = Math.ceil(total / limit) || 1;
	const maxVisible = 7;
	const pageItems = [];
	if (totalPages <= maxVisible) {
		for (let i = 0; i < totalPages; i++) {
			pageItems.push(
				<PaginationItem key={i}>
					<PaginationLink
						href="#"
						aria-current={page === i ? "page" : undefined}
						onClick={(e) => {
							e.preventDefault();
							setPage(i);
						}}
						className={page === i ? "bg-muted text-foreground" : ""}
					>
						{i + 1}
					</PaginationLink>
				</PaginationItem>
			);
		}
	} else {
		const showLeftEllipsis = page > 3;
		const showRightEllipsis = page < totalPages - 4;
		const firstPage = 0;
		const lastPage = totalPages - 1;
		let start = Math.max(page - 1, 1);
		let end = Math.min(page + 1, totalPages - 2);
		if (page <= 3) {
			start = 1;
			end = 3;
		} else if (page >= totalPages - 4) {
			start = totalPages - 4;
			end = totalPages - 2;
		}
		// First page
		pageItems.push(
			<PaginationItem key={firstPage}>
				<PaginationLink
					href="#"
					aria-current={page === firstPage ? "page" : undefined}
					onClick={(e) => {
						e.preventDefault();
						setPage(firstPage);
					}}
					className={page === firstPage ? "bg-muted text-foreground" : ""}
				>
					{firstPage + 1}
				</PaginationLink>
			</PaginationItem>
		);
		// Left ellipsis
		if (showLeftEllipsis) {
			pageItems.push(
				<PaginationItem key="left-ellipsis">
					<PaginationEllipsis />
				</PaginationItem>
			);
		}
		// Page range
		for (let i = start; i <= end; i++) {
			pageItems.push(
				<PaginationItem key={i}>
					<PaginationLink
						href="#"
						aria-current={page === i ? "page" : undefined}
						onClick={(e) => {
							e.preventDefault();
							setPage(i);
						}}
						className={page === i ? "bg-muted text-foreground" : ""}
					>
						{i + 1}
					</PaginationLink>
				</PaginationItem>
			);
		}
		// Right ellipsis
		if (showRightEllipsis) {
			pageItems.push(
				<PaginationItem key="right-ellipsis">
					<PaginationEllipsis />
				</PaginationItem>
			);
		}
		// Last page
		pageItems.push(
			<PaginationItem key={lastPage}>
				<PaginationLink
					href="#"
					aria-current={page === lastPage ? "page" : undefined}
					onClick={(e) => {
						e.preventDefault();
						setPage(lastPage);
					}}
					className={page === lastPage ? "bg-muted text-foreground" : ""}
				>
					{lastPage + 1}
				</PaginationLink>
			</PaginationItem>
		);
	}
	return pageItems;
}

export default function ProductTable() {
	const [page, setPage] = useState(0);
	const [search, setSearch] = useState("");
	const delay = 1000; // delay for loading states visibility
	const limit = 10; // default to 10 initial fetch
	const skip = page * limit; // for pagination fetch 0-10 in 1st fetch, 11-20 in 2nd and so on..

	const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
		undefined
	);

	const { data, isLoading, isError, isFetching } = useProducts(
		limit,
		skip,
		search || undefined,
		delay,
		selectedCategory
	);
	const deleteMutation = useDeleteProduct();

	const categories = useCategories();
	// console.log("Categories", categories.data);

	const [products, setProducts] = useState<any[]>([]);
	const [localLoading, setLocalLoading] = useState<boolean>(false); // loading state to manage the isLoading from useProducts hook
	const [editProduct, setEditProduct] = useState<any | null>(null);
	const total = data?.total ?? products.length ?? 0;

	useEffect(() => {
		if (data?.products) setProducts(data.products);
	}, [data]);

	useEffect(() => {
		const timer: ReturnType<typeof setTimeout> | null = null;

		if (isLoading) {
			setLocalLoading(true);
			return;
		}

		if (isFetching) {
			setLocalLoading(true);
		} else {
			setLocalLoading(false);
		}

		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [isLoading, isFetching, delay]);

	// Refresh the table and reset the pagination
	const onSuccess = () => {
		setPage(0);
	};

	const handleEdit = (product: any) => {
		// open the edit dialog with the selected product
		setEditProduct(product);
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<CardTitle>Products</CardTitle>
					<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
						<Select
							onValueChange={(value) => {
								// console.log("value", value);
								setSelectedCategory(value);
							}}
							value={selectedCategory}
						>
							<SelectTrigger className="w-full sm:w-[180px]">
								<SelectValue placeholder="All categories" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All</SelectItem>
								{Array.isArray(categories?.data)
									? categories?.data.map((category: any) => (
											<SelectItem key={category.slug} value={category.slug}>
												{category.name}
											</SelectItem>
									  ))
									: null}
							</SelectContent>
						</Select>
						<div className="relative">
							<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
							<Input
								className="pl-10 w-full sm:w-64"
								placeholder="Search products..."
								value={search}
								onChange={(e) => {
									setSearch(e.target.value);
									setPage(0);
								}}
							/>
						</div>
						<ProductForm
							trigger={
								<Button className="w-full sm:w-auto">
									<Plus className="h-4 w-4 mr-2" />
									Add Product
								</Button>
							}
							onSuccess={onSuccess}
						/>
						{editProduct && (
							<ProductForm
								initialData={editProduct}
								open={Boolean(editProduct)}
								onOpenChange={(open: boolean) => {
									if (!open) setEditProduct(null);
								}}
								onSuccess={onSuccess}
							/>
						)}
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Stock</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoading || localLoading ? (
							Array.from({ length: 5 }).map((_, i) => (
								<TableRow key={i}>
									<TableCell>
										<Skeleton className="h-4 w-48" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-20" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-28" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-16" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-24" />
									</TableCell>
								</TableRow>
							))
						) : isError ? (
							<TableRow>
								<TableCell colSpan={5} className="text-center text-red-500">
									Failed to load products
								</TableCell>
							</TableRow>
						) : products.length === 0 ? (
							<TableRow>
								<TableCell colSpan={5} className="text-center text-gray-500">
									No products found
								</TableCell>
							</TableRow>
						) : (
							products.map((p: any) => (
								<TableRow key={p.id}>
									<TableCell className="font-medium">{p.title}</TableCell>
									<TableCell>${p.price}</TableCell>
									<TableCell>{p.category}</TableCell>
									<TableCell>{p.stock}</TableCell>
									<TableCell>
										<div className="flex gap-2">
											<Button
												onClick={() => handleEdit(p)}
												variant="outline"
												size="sm"
											>
												<Edit2 className="h-4 w-4" />
											</Button>
											<Button
												variant="destructive"
												size="sm"
												onClick={() => deleteMutation.mutate(p.id)}
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
				{/* Pagination */}
				<div className="flex justify-center mt-4">
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									href="#"
									aria-disabled={page === 0}
									onClick={(e) => {
										e.preventDefault();
										if (page === 0) return;
										setPage((p) => Math.max(0, p - 1));
									}}
								/>
							</PaginationItem>
							{renderPagination({ page, setPage, total, limit, skip })}
							<PaginationItem>
								<PaginationNext
									href="#"
									aria-disabled={skip + limit >= total}
									onClick={(e) => {
										e.preventDefault();
										if (skip + limit >= total) return;
										setPage((p) => p + 1);
									}}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</CardContent>
		</Card>
	);
}
