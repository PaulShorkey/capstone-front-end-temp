const USEFUL_FUNCTIONS = {
    formatTimestamp : (timestamp) => {
        let date = '';
        let time = '';
        let t = timestamp.indexOf('T');

        for (let i = 0; i < timestamp.length; i++) {
            if (i < t)
                date += timestamp[i];
            else
                time += timestamp[i];
        }
    }
}

export { USEFUL_FUNCTIONS };