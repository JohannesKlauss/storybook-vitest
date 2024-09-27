import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";

export interface ModalProps {
  onSubmit: (name: string, username: string) => void
  name: string
  email: string
}

export const Modal = ({onSubmit, name = '', email = ''}: ModalProps) => {
  const [inputName, setInputName] = useState(name)
  const [inputEmail, setInputEmail] = useState(email)
  const [open, setOpen] = useState(false)

  const submit = () => {
    setOpen(false)
    onSubmit(inputName.trim(), inputEmail.trim())
  }

  return (
    <Accordion type="single" collapsible value={open ? 'item-1' : ''}>
      <AccordionItem value="item-1">
        <AccordionTrigger className={'min-w-96'} onClick={() => setOpen(!open)}>Edit Your Spaceteams Profile</AccordionTrigger>
        <AccordionContent>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Email
              </Label>
              <Input
                id="username"
                className="col-span-3"
                type={'email'}
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
              />
            </div>

            {open && <Button type="submit" className={'bg-zinc-500'} onClick={submit}>Save changes</Button>}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
