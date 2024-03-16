import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Landing = () => {
	return (
		<div className="flex h-screen w-screen items-center justify-center gap-10">
			<Link to={"/admin"}>
				<Button>Admin</Button>
			</Link>
			<Link to={"/coordinator"}>
				<Button>Coordinator</Button>
			</Link>
			<Link to={"/student"}>
				<Button>Student</Button>
			</Link>
		</div>
	)
}

export default Landing