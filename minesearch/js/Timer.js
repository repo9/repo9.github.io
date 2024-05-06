
class Timer = {
	_start_time: null, /* Starting time */
	_end_time: null, /* Ending time */
	_timer: null, /* Timer is on */
	
	contructor() {
		this._start_time = 0;
		this._end_time = 0;
		this._timer = false;
	}
	
	/**
	 * Resets the timer.
	 */
	reset() {
		this._start_time = 0;
		this._end_time = 0;
		this._timer = false;
	}
	
	/**
	 * Starts the timer.
	 */
	start() {
		if (!this._timer) {
			this._timer = true;
			this._start_time = Date.now();
		}
	}
	
	/**
	 * Stops the timer.
	 */
	stop() {
		if (this._timer) {
			this._timer = false;
			this._end_time = Date.now();
		}
	}
	
	/**
	 * Gets the time read on the timer.
	 */
	getTime() {
		if (this._timer) {
			return (Date.now() - this._start_time) / MS_PER_S;
		} else {
			return (this._end_time - this._start_time) / MS_PER_S;
		}
	}
}