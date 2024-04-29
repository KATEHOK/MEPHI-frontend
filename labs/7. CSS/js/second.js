class Stalker {
    #radius;
    #stalkerEl;
    #containerEl;

    /**
     * @param {string} stalkerId индекс элемента-сталкера
     * @param {string} containerId индекс элемента-контейнера
     */
    constructor (stalkerId, containerId = null, stalkerRadius = 30) {
        this.#stalkerEl = document.querySelector('#' + stalkerId);
        this.#containerEl = document.querySelector('#' + containerId);
        this.#radius = stalkerRadius;

        this.#setContainerEventListener();
        console.log(this);
    }

    #setContainerEventListener() {
        this.#containerEl.addEventListener("mousemove", e => {
            if (e.target.id == this.#containerEl.id) {
                this.#stalkerEl.style.top = (e.offsetY - this.#radius) + 'px';
                this.#stalkerEl.style.left = (e.offsetX - this.#radius) + 'px';
            }
        });
    }
}

let ball = new Stalker("ball", "main");