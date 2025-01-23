import './App.css'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"


function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Label htmlFor="email">Your email address</Label>
        <Input type="email" placeholder="Email"/>
        <Label htmlFor="message">Your Message</Label>
        <Textarea placeholder="Type your message here." id="message"/>
      </CardContent>
    </Card>
  )
}

export default App
