import './style.css';
import Chat from './components/Chat';
import ScrollSpy from './components/ScrollSpy';


window.addEventListener('load', () => {
	const oChat = new Chat('.DS__Messaging ul', '.DS__Logo');
	setTimeout( () => oChat.talk(), 3500 );

	const oSpy = new ScrollSpy('body', '.DS__Section');
	oSpy.spy();
});