import React from "react";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarInset>
			<header className="h-16 bg-white border-b flex items-center px-4">
				<SidebarTrigger className="mr-4" />
				<h1 className="text-lg font-semibold text-black">Product Dashboard</h1>
			</header>
			<main className="flex-1 overflow-auto p-6">{children}</main>
		</SidebarInset>
	);
}
