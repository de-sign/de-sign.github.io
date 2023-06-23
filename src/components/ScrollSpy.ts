export default class ScrollSpy {

    hContener: HTMLElement | null;
    aSection: HTMLElement[] = [];

    sCurrentColor: string = 'light';

    constructor(sContener: string, sSection: string) {
        this.hContener = document.querySelector(sContener);
        this.aSection = [...document.querySelectorAll<HTMLInputElement>(sSection)];
    }

    spy(): void {
        const fCallback = () => {
            if( this.hContener ){
                const sColor: string = this.check();
                if( sColor != this.sCurrentColor ){
                    this.hContener.classList.remove(`--theme-${this.sCurrentColor}`);
                    this.hContener.classList.add(`--theme-${sColor}`);
                    this.sCurrentColor = sColor;
                }
            }
        };

        window.addEventListener('scroll', fCallback);
        fCallback();
    }

    check(): string {
        let sColor: string | undefined,
            nSection: number = 0;
        
        if( document.documentElement.scrollHeight - document.documentElement.clientHeight == document.documentElement.scrollTop ){
            nSection = this.aSection.length
        }
        else {

            const nSwitchLine: number = document.documentElement.scrollTop + document.documentElement.clientHeight / 2;
            while(
                nSection < this.aSection.length
                && this.aSection[nSection].offsetTop < nSwitchLine
            ) {
                nSection++;
            }
        }

        sColor = this.aSection[nSection - 1].dataset.color;
        this.aSection[nSection - 1].classList.add('--show');

        return sColor ? sColor : 'light';
    }

}