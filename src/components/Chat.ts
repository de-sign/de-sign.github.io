export default class Chat {

	hContener: any;
	hAvatar: any;

	aText: string[] = [];
	nText: number = -1;
	nChar: number = -1;
	sText: string = '';

	constructor(sContener: string, sAvatar: string) {
		this.hAvatar = document.querySelector(sAvatar);
		this.hAvatar?.classList.add('--appear');
		
		this.hContener = document.querySelector(sContener);
        if( this.hContener ){
            [...this.hContener.children].forEach( (hLi: HTMLElement) => {
                this.aText.push( hLi.innerHTML );
                this.hContener.removeChild( hLi );
            } );
        }
	}
	
	talk(): void {

        if( this.aText.length ){

            this.nChar = -1;
            this.nText++;
			this.sText = '';

            this.nText || this.hAvatar?.classList.remove('--appear');
            
            if( this.aText.length > this.nText ){
                this.hAvatar?.classList.add('--talk');

                const hLi: HTMLElement = document.createElement('li');
                this.hContener.appendChild(hLi);
                
                this.write();
            }
        }
	}
	
	write(): void {

		this.nChar++;
        
		if( this.aText[this.nText].length > this.nChar ){
			let sText = this.aText[this.nText][this.nChar];

			if( sText == '<' ){
				while( sText[sText.length - 1] != '>' ){
					this.nChar++;
					sText += this.aText[this.nText][this.nChar];
				}
			}
			else if( sText == '&' ) {
				while( sText[sText.length - 1] != ';' ){
					this.nChar++;
					sText += this.aText[this.nText][this.nChar];
				}
			}

			this.sText += sText;

			this.hContener.children[this.nText].innerHTML = this.sText;
			setTimeout( () => this.write(), 25 );
		}
        else {
			this.hAvatar?.classList.remove('--talk');
			setTimeout( () => this.talk(), 1000 );
		}
	}
}