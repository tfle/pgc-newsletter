import React from "react"
import "./App.css"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";


function App() {
  const [formData, setFormData] = React.useState({
    month: "",
    presidentMessage: "",
    highlights: [{
      title: "",
      description: "",
      imageURL: "",
      link: ""
    }],
    events: [{
      title: "",
      description: "",
      date: "",
      imageURL: "",
      link: ""
    }]
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, section: string) => {
    setFormData({...formData, [section]: e.target.value})
    console.log(formData)
  }

  const addItem = (section: string) => {
    const newData = {...formData};
    if (section === "highlights") {
      newData.highlights.push({title: "", description: "", imageURL: "", link: ""});
    } else if (section === "events") {
      newData.events.push({title: "", description: "", date: "", imageURL: "", link: ""});
    }
    setFormData(newData);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>PGC Newsletter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Info */}
        <div className="space-y-4">
          <Label htmlFor="newsletterMonth">Newsletter Month</Label>
          <Input
            type="text"
            placeholder="e.g. January"
            value={formData.month}
            onChange={(e) => handleChange(e, "month")}/>
          <Label htmlFor="message">President's Message</Label>
          <Textarea
            id="message"
            value={formData.presidentMessage}
            onChange={(e) => handleChange(e, "presidentMessage")}/>
        </div>

        {/* Highlights */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Highlights</h2>
          <Button
            onClick={() => addItem('highlights')}
            variant="outline"
          >
            <Plus/>Add Highlight
          </Button>

          {/* Highlight Cards */}
          {formData.highlights.map((highlight, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Update</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="text"
                  placeholder="Title"
                  value={highlight.title}/>
                <Textarea
                  placeholder="Description"
                  value={highlight.description}/>
                <Input
                  type="url"
                  placeholder="Image URL"
                  value={highlight.imageURL}/>
                <Input
                  type="url"
                  placeholder="Link URL"
                  value={highlight.link}/>
              </CardContent>
            </Card>
          ))}

        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium">What's On</h2>
          <Card>
            <CardHeader>
              <CardTitle>Event</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input type="text" placeholder="Event Title"/>
              <Textarea placeholder="Event Description"/>
              <Input type="date" placeholder="Event Date"/>
              <Input type="url" placeholder="Image URL"/>
              <Input type="url" placeholder="Link URL"/>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}

export default App
