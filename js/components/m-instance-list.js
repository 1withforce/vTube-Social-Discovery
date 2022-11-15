import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './m-instance-info.js'
import domains from '../../data/domains.js'

export default class MastodonInstanceList extends LitElement{
    static styles = css`
        :host{
            display: flex;
            justify-content: space-evenly;
            flex-wrap: wrap;
        }
    `;

    render(){return html`
        ${domains.map(d=>html`<m-instance-info domain=${d}></m-instance-info>`)}
    `}
}

customElements.define('m-instance-list', MastodonInstanceList);