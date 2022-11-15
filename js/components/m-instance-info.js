import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export default class MastodonInstanceInfo extends LitElement{
    static styles = css`
        :host{
            background-color: darkgray;
            border-radius: 2em;
            margin: 1em;
            width: 30em;
            position: relative;
        }
        img{
            object-fit: contain;
            max-width: 100%;
        }
        .text{
            padding: 1em;
            margin-bottom: 2em;
        }
        .btn{
            font-size: larger;
            background-color: antiquewhite;
            border-radius: 2em;
            text-decoration: none;
            width: 92%;
            display: block;
            position: absolute;
            bottom: 0;
            padding: 1em;
        }
    `
    static properties = {
        model: {type: Object},
        domain: {type: String}
    }

    constructor(){
        super();
        this.model = null;
        this.domain = null;
    }

    stripTags(html){
        return (new DOMParser().parseFromString(html, 'text/html')).body.textContent;
    }

    render(){
        return this.model ? html`
            <div @click=${()=>window.open("https://${this.model.uri}",'_blank')}>
                <h3 class="title">${this.model.title}</h3>
                <img src="${this.model.thumbnail}" alt="instance thumbnail">
                <p class="text">${this.stripTags(this.model.short_description)}</p>
            </div>
    ` : html`<h3>Loading...</h3>`}

    updated(changedProperties){
        if(changedProperties.has('domain')){
            this.fetch();
        }
    }

    async fetch(){
        fetch(`https://${this.domain}/api/v1/instance`)
            .then(res=>res.json())
            .then(data=>this.model=data)
            .catch(e=>console.warn(`Failed to fetch instance info from ${this.domain}`, e))
    }
}

customElements.define('m-instance-info', MastodonInstanceInfo);