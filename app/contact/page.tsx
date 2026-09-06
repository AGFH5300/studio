import ContactForm from './contact-form';
export const metadata={title:"The Welcome Desk — Veya Labs",description:"Tell us a little about your project."};
export default function ContactPage(){return <main className="room-content room-contact"><header><span className="room-eyebrow">The welcome desk</span><h1>Tell us what you have in mind.</h1><p>An idea, a challenge or a ready-to-go brief. A little context is all we need to begin.</p></header><ContactForm/></main>}
