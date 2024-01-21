class PerformanceStats {
    constructor(root) {
        this.root = root;
        this.frameStats = null;
        this.postFrameCallback();
    }

    setRenderedEntities(e) {
        this.frameStats.renderedEntities = e;
    }

    postFrameCallback() {
        this.frameStats = { renderedEntities: 0 };
    }

    getStatsText() {
        let statsText = "<b>Performance:</b><br />";
        statsText += `${this.root.entityMgr.getStatsText()}<br />`;
        statsText += `${this.frameStats.renderedEntities} rendered entities<br />`;
        statsText += `${this.root.animations.debugStr()}<br />`;

        return statsText;
    }
}

export default PerformanceStats;