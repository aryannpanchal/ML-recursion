import { Button } from "@/components/ui/button";
import Link from "next/link";

const landingPage = () => {
    return(
        <div>
            Landing Page (unprotected)
         <div>
         <Link href="/sign-up">
          <Button>
            Sign Up
          </Button>
         </Link>
          </div> 
          <div>
         <Link href="/sign-in">
          <Button>
            Log In
          </Button>
         </Link>
          </div>
        </div>
    )
}

export default landingPage;