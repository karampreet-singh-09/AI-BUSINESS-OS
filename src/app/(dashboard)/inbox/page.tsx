import { getConversations } from "@/app/actions/messages"
import InboxClient from "./inbox-client"

export default async function InboxPage() {
  const conversations = await getConversations()

  return <InboxClient initialConversations={conversations} />
}
