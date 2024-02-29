import { Button } from "@/components/ui/button"

const Landing = () => {
	return (
		<div className="flex flex-col gap-5 h-screen w-screen items-center justify-center">
			<Button className="w-72" variant="destructive">Login</Button>
			<Button className="w-72" variant="secondary">Login</Button>
			<Button className="w-72" >Login</Button>
			<p className="font-medium text-lg">Hello world</p>
		</div>
	)
}

export default Landing