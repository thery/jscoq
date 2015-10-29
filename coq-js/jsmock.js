// Mock interfacea
var JsCoq;
var jsCoq;

(function () {
    JsCoq = function() {
        this.cur_sid  = 0;
        this.next_sid = 1;
        this.lastcmd = "";
    }

    JsCoq.prototype.init = function () {
        this.onInit.call();
        return this.cur_sid;
    }

    JsCoq.prototype.version = function () {
        return "Mock JsCoq object";
    }

    JsCoq.prototype.goals = function () {
        return "Mock JsCoq goals at sid: " + this.cur_sid + "\nwith lastcmd: " + this.lastcmd;
    }

    JsCoq.prototype.add = function (eid, sid, goal) {

        // Returns sid or 0 if error.
        // Do it every 3 adds?
        this.lastcmd = goal;
        this.cur_sid = this.next_sid;
        this.next_sid++;
        return this.cur_sid;
    }

    JsCoq.prototype.edit = function (sid) {
        // Go back to sid;
        this.cur_sid = sid;
        return;
    }

    JsCoq.prototype.commit = function (sid) {
        // commit sid; may throw on error?
        if (! (sid % 5) || 50 < sid) {
            this.onError(sid);
            this.onLog("ErrorMsg: Mock! " + sid);
            // this.onError.call(this, sid);
            // this.onLog.call(this, "ErrorMsg: Mock!");
        }
        return;
    }

})();

jsCoq = new JsCoq();

// Local Variables:
// js-indent-level: 4
// End:
