
import useTimeoutRedirect from "@/lib/useTimeoutRedirect"

export default function ErrorPage() {
    const {secondsRemaining} = useTimeoutRedirect("/",5)
    return <p>Not Found! Will Redirect Within {secondsRemaining}</p>
}