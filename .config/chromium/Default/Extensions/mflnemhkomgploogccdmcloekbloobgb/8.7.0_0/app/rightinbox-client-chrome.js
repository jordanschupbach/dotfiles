/**
  * Copyright (c) 2012-2016 Right Inbox
  *
  * Notice
  *
  * This file contains works from many authors under various (but compatible)
  * licenses. Please visit http://rightinbox.com/notices for more information.
  *
 **/

(function() {
    var RemoteReq, _u, getUserAgent, injectXmlHttp, startLoading, bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments);
        };
    }, indexOf = [].indexOf || function(item) {
        for (var i = 0, l = this.length; i < l; i++) if (i in this && this[i] === item) return i;
        return -1;
    }, slice = [].slice;
    _u = _.noConflict(), window.RIG || (window.RIG = !0, getUserAgent = function() {
        return navigator.userAgent.indexOf("Firefox") !== -1 ? "firefox" : navigator.userAgent.indexOf("Chrome") !== -1 ? "chrome" : navigator.userAgent.indexOf("Safari") !== -1 ? "safari" : "undefined";
    }, injectXmlHttp = function(src, data, cb) {
        var xhr;
        return null == cb && (cb = function() {}), xhr = new XMLHttpRequest(), xhr.onreadystatechange = function() {
            var ref;
            if (xhr.readyState === XMLHttpRequest.DONE) return 200 <= (ref = xhr.status) && ref < 300 || 304 === xhr.status ? cb(!0, xhr.responseText) : cb(!1);
        }, xhr.open("POST", src, !0), xhr.setRequestHeader("Content-Type", "application/json"), 
        xhr.withCredentials = !0, xhr.send(data);
    }, RemoteReq = function() {
        function RemoteReq(arg) {
            this.type = arg.type, this.src = arg.src, this.sid = arg.sid, this.data = arg.data, 
            this.load = bind(this.load, this);
        }
        return RemoteReq.prototype.load = function() {
            switch (this.type) {
              case "xmlhttp":
                return this.src = this.src + "&pt=" + getUserAgent()[0] + "&ng=e&xmlhttp=true&sid=" + this.sid, 
                injectXmlHttp(this.src, this.data, function(_this) {
                    return function(status, response) {
                        return status === !0 ? _this.onload(response) : _this.onerror();
                    };
                }(this));
            }
        }, RemoteReq.prototype.onload = function() {}, RemoteReq.prototype.onerror = function() {}, 
        RemoteReq;
    }(), startLoading = !0, location.href.match(/^https?:\/\/(inbox.google.com|mail.google.com\/mail)/) ? location.search.indexOf("ohhl4rw8mbn4") !== -1 ? startLoading = !1 : location.search.indexOf("mail-static") !== -1 && (startLoading = !1) : startLoading = !1, 
    startLoading && !function() {
        return function() {
            return function($) {
                !function(factory) {
                    "function" == typeof define && define.amd ? define([ "jquery" ], factory) : factory("object" == typeof exports ? require("jquery") : jQuery);
                }(function($) {
                    function encode(s) {
                        return config.raw ? s : encodeURIComponent(s);
                    }
                    function decode(s) {
                        return config.raw ? s : decodeURIComponent(s);
                    }
                    function stringifyCookieValue(value) {
                        return encode(config.json ? JSON.stringify(value) : String(value));
                    }
                    function parseCookieValue(s) {
                        0 === s.indexOf('"') && (s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
                        try {
                            return s = decodeURIComponent(s.replace(pluses, " ")), config.json ? JSON.parse(s) : s;
                        } catch (e) {}
                    }
                    function read(s, converter) {
                        var value = config.raw ? s : parseCookieValue(s);
                        return $.isFunction(converter) ? converter(value) : value;
                    }
                    var pluses = /\+/g, config = $.cookie = function(key, value, options) {
                        if (void 0 !== value && !$.isFunction(value)) {
                            if (options = $.extend({}, config.defaults, options), "number" == typeof options.expires) {
                                var days = options.expires, t = options.expires = new Date();
                                t.setTime(+t + 864e5 * days);
                            }
                            return document.cookie = [ encode(key), "=", stringifyCookieValue(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : "" ].join("");
                        }
                        for (var result = key ? void 0 : {}, cookies = document.cookie ? document.cookie.split("; ") : [], i = 0, l = cookies.length; i < l; i++) {
                            var parts = cookies[i].split("="), name = decode(parts.shift()), cookie = parts.join("=");
                            if (key && key === name) {
                                result = read(cookie, value);
                                break;
                            }
                            key || void 0 === (cookie = read(cookie)) || (result[name] = cookie);
                        }
                        return result;
                    };
                    config.defaults = {}, $.removeCookie = function(key, options) {
                        return void 0 !== $.cookie(key) && ($.cookie(key, "", $.extend({}, options, {
                            expires: -1
                        })), !$.cookie(key));
                    };
                }), function($) {
                    var defaults = {
                        calId: 0,
                        cssName: "default",
                        startDate: -1,
                        endDate: -1,
                        selectedDate: -1,
                        showPrevNext: !0,
                        allowOld: !0,
                        showAlways: !1,
                        position: "absolute",
                        zIndex: 9999,
                        monthNames: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                        sundayIsFirstDay: !1
                    }, methods = {
                        init: function(options) {
                            return this.each(function() {
                                var self = $(this), settings = $.extend({}, defaults);
                                settings.calId = self[0].id + "-gldp", options && (settings = $.extend(settings, options)), 
                                self.data("settings", settings), self.click(methods.show).focus(methods.show), settings.showAlways && setTimeout(function() {
                                    self.trigger("focus");
                                }, 50), $(window).bind("click", function(e) {
                                    methods.hide.apply(self);
                                });
                            });
                        },
                        show: function(e) {
                            e.stopPropagation(), methods.hide.apply($("._gldp").not($(this))), methods.update.apply($(this));
                        },
                        hide: function() {
                            if ($(this).length) {
                                var s = $(this).data("settings");
                                s && !s.showAlways && ($("#" + s.calId).hide(), $(this).removeClass("_gldp"));
                            }
                        },
                        setStartDate: function(e) {
                            $(this).data("settings").startDate = e;
                        },
                        setEndDate: function(e) {
                            $(this).data("settings").endDate = e;
                        },
                        setSelectedDate: function(e) {
                            $(this).data("settings").selectedDate = e;
                        },
                        update: function() {
                            var target = $(this), settings = target.data("settings"), calId = settings.calId, startDate = settings.startDate;
                            settings.startDate == -1 && (startDate = new Date(), startDate.setDate(1)), startDate.setHours(0, 0, 0, 0);
                            var startTime = startDate.getTime(), endDate = new Date(0);
                            settings.endDate != -1 && (endDate = new Date(settings.endDate), /^\d+$/.test(settings.endDate) && (endDate = new Date(startDate), 
                            endDate.setDate(endDate.getDate() + settings.endDate))), endDate.setHours(0, 0, 0, 0);
                            var endTime = endDate.getTime(), selectedDate = new Date(0);
                            settings.selectedDate != -1 && (selectedDate = new Date(settings.selectedDate), 
                            /^\d+$/.test(settings.selectedDate) && (selectedDate = new Date(startDate), selectedDate.setDate(selectedDate.getDate() + settings.selectedDate))), 
                            selectedDate.setHours(0, 0, 0, 0);
                            var selectedTime = selectedDate.getTime(), theDate = target.data("theDate");
                            theDate = theDate == -1 || "undefined" == typeof theDate ? startDate : theDate;
                            var firstDate = new Date(theDate);
                            firstDate.setDate(1);
                            var firstTime = firstDate.getTime(), lastDate = new Date(firstDate);
                            lastDate.setMonth(lastDate.getMonth() + 1), lastDate.setDate(0);
                            var lastTime = lastDate.getTime(), lastDay = lastDate.getDate(), prevDateLastDay = new Date(firstDate);
                            prevDateLastDay.setDate(0), prevDateLastDay = prevDateLastDay.getDate();
                            var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
                            target.data("theDate", theDate);
                            for (var days = "", shift = settings.sundayIsFirstDay ? 1 : 0 == firstDate.getDay() ? -5 : 2, y = 0, i = 0; y < 6; y++) {
                                for (var row = "", x = 0; x < 7; x++, i++) {
                                    var p = prevDateLastDay - firstDate.getDay() + i + shift, n = p - prevDateLastDay;
                                    if (settings.sundayIsFirstDay) var c = 0 == x ? "sun" : 6 == x ? "sat" : "day"; else var c = 6 == x ? "sun" : 5 == x ? "sat" : "day";
                                    var today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    var date = new Date(theDate);
                                    date.setHours(0, 0, 0, 0), date.setDate(n);
                                    var dateTime = date.getTime();
                                    n >= 1 && n <= lastDay ? (c = today.getTime() == dateTime ? "today" : c, settings.allowOld || (c = dateTime < startTime ? "noday" : c), 
                                    settings.endDate != -1 && (c = dateTime > endTime ? "noday" : c), settings.selectedDate != -1 && (c = dateTime == selectedTime ? "selected" : c)) : (n > lastDay && (c = "nextmonth"), 
                                    n < 1 && (c = "prevmonth"), settings.allowOld || (c = dateTime < startTime ? "noday" : c), 
                                    n = n <= 0 ? p : p - lastDay - prevDateLastDay), row += "<td class='gldp-days " + c + " **-" + c + "'><div class='" + c + "'>" + n + "</div></td>";
                                }
                                days += "<tr class='days'>" + row + "</tr>";
                            }
                            var showP = startTime < firstTime || settings.allowOld, showN = lastTime < endTime || endTime < startTime;
                            settings.showPrevNext || (showP = showN = !1);
                            var titleMonthYear = monthNames[theDate.getMonth()] + " " + theDate.getFullYear(), html = "<div class='**'><table><tr>" + ("<td class='**-prevnext prev'>" + (showP ? "◄" : "") + "</td>") + "<td class='**-monyear' colspan='5'>{MY}</td>" + ("<td class='**-prevnext next'>" + (showN ? "►" : "") + "</td>") + "</tr><tr class='**-dow'>" + (settings.sundayIsFirstDay ? "<td>Sun</td><td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td>" : "<td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td><td>Sun</td>") + "</tr>" + days + "</table><div>";
                            html = html.replace(/\*{2}/gi, "gldp-" + settings.cssName).replace(/\{MY\}/gi, titleMonthYear), 
                            0 == $("#" + calId).length && target.after($("<div id='" + calId + "'></div>")), 
                            $("#" + calId).css({
                                position: settings.position,
                                "z-index": settings.zIndex,
                                left: target.position().left,
                                top: target.position().top + target.outerHeight(!0)
                            });
                            var calendar = $("#" + calId);
                            calendar.html(html).show(), target.addClass("_gldp"), $("[class*=-prevnext]", calendar).click(function(e) {
                                if (e.stopPropagation(), "" != $(this).html()) {
                                    var offset = $(this).hasClass("prev") ? -1 : 1, newDate = new Date(firstDate);
                                    newDate.setMonth(theDate.getMonth() + offset), target.data("theDate", newDate), 
                                    methods.update.apply(target);
                                }
                            }), $("tr.days td:not(.noday, .selected)", calendar).mouseenter(function(e) {
                                var css = "gldp-" + settings.cssName + "-" + $(this).children("div").attr("class");
                                $(this).removeClass(css).addClass(css + "-hover");
                            }).mouseleave(function(e) {
                                if (!$(this).hasClass("selected")) {
                                    var css = "gldp-" + settings.cssName + "-" + $(this).children("div").attr("class");
                                    $(this).removeClass(css + "-hover").addClass(css);
                                }
                            }).click(function(e) {
                                e.stopPropagation();
                                var day = $(this).children("div").html(), settings = target.data("settings"), newDate = new Date(theDate);
                                newDate.setDate(day), $(this).closest("tr.days").index() > 4 && day < 10 ? newDate.setMonth(newDate.getMonth() + 1) : $(this).closest("tr.days").index() <= 3 && day > 20 && newDate.setMonth(newDate.getMonth() - 1), 
                                31 == day && 1 == newDate.getDate() && newDate.setDate(0), target.data("theDate", newDate), 
                                target.val(settings.monthNames[newDate.getMonth()] + " " + newDate.getDate() + " " + newDate.getFullYear()), 
                                null != settings.onChange && "undefined" != typeof settings.onChange && settings.onChange(target, newDate), 
                                target.trigger("change"), settings.selectedDate = newDate, methods.hide.apply(target);
                            });
                        }
                    };
                    $.fn.glDatePicker = function(method) {
                        return methods[method] ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof method && method ? void $.error("Method " + method + " does not exist on jQuery.glDatePicker") : methods.init.apply(this, arguments);
                    };
                }(jQuery), function(factory) {
                    "function" == typeof define && define.amd ? define([ "jquery" ], factory) : factory(window.jQuery || window.Zepto);
                }(function($) {
                    "use strict";
                    var Mask = function(el, mask, options) {
                        var old_value, regexMask, jMask = this;
                        el = $(el), mask = "function" == typeof mask ? mask(el.val(), void 0, el, options) : mask, 
                        jMask.init = function() {
                            options = options || {}, jMask.byPassKeys = [ 9, 16, 17, 18, 36, 37, 38, 39, 40, 91 ], 
                            jMask.translation = {
                                "0": {
                                    pattern: /\d/
                                },
                                "9": {
                                    pattern: /\d/,
                                    optional: !0
                                },
                                "#": {
                                    pattern: /\d/,
                                    recursive: !0
                                },
                                A: {
                                    pattern: /[a-zA-Z0-9]/
                                },
                                S: {
                                    pattern: /[a-zA-Z]/
                                }
                            }, jMask.translation = $.extend({}, jMask.translation, options.translation), jMask = $.extend(!0, {}, jMask, options), 
                            regexMask = p.getRegexMask(), el.each(function() {
                                options.maxlength !== !1 && el.attr("maxlength", mask.length), options.placeholder && el.attr("placeholder", options.placeholder), 
                                el.attr("autocomplete", "off"), p.destroyEvents(), p.events();
                                var caret = p.getCaret();
                                p.val(p.getMasked()), p.setCaret(caret + p.getMaskCharactersBeforeCount(caret, !0));
                            });
                        };
                        var p = {
                            getCaret: function() {
                                var sel, pos = 0, ctrl = el.get(0), dSel = document.selection, cSelStart = ctrl.selectionStart;
                                return dSel && !~navigator.appVersion.indexOf("MSIE 10") ? (sel = dSel.createRange(), 
                                sel.moveStart("character", el.is("input") ? -el.val().length : -el.text().length), 
                                pos = sel.text.length) : (cSelStart || "0" === cSelStart) && (pos = cSelStart), 
                                pos;
                            },
                            setCaret: function(pos) {
                                if (el.is(":focus")) {
                                    var range, ctrl = el.get(0);
                                    ctrl.setSelectionRange ? ctrl.setSelectionRange(pos, pos) : ctrl.createTextRange && (range = ctrl.createTextRange(), 
                                    range.collapse(!0), range.moveEnd("character", pos), range.moveStart("character", pos), 
                                    range.select());
                                }
                            },
                            events: function() {
                                el.on("keydown.mask", function() {
                                    old_value = p.val();
                                }), el.on("keyup.mask", p.behaviour), el.on("paste.mask drop.mask", function() {
                                    setTimeout(function() {
                                        el.keydown().keyup();
                                    }, 100);
                                }), el.on("change.mask", function() {
                                    el.data("changeCalled", !0);
                                }), el.on("blur.mask", function(e) {
                                    var el = $(e.target);
                                    el.prop("defaultValue") !== el.val() && (el.prop("defaultValue", el.val()), el.data("changeCalled") || el.trigger("change")), 
                                    el.data("changeCalled", !1);
                                }), el.on("focusout.mask", function() {
                                    options.clearIfNotMatch && !regexMask.test(p.val()) && p.val("");
                                });
                            },
                            getRegexMask: function() {
                                for (var translation, pattern, optional, recursive, oRecursive, r, maskChunks = [], i = 0; i < mask.length; i++) translation = jMask.translation[mask[i]], 
                                translation ? (pattern = translation.pattern.toString().replace(/.{1}$|^.{1}/g, ""), 
                                optional = translation.optional, recursive = translation.recursive, recursive ? (maskChunks.push(mask[i]), 
                                oRecursive = {
                                    digit: mask[i],
                                    pattern: pattern
                                }) : maskChunks.push(optional || recursive ? pattern + "?" : pattern)) : maskChunks.push("\\" + mask[i]);
                                return r = maskChunks.join(""), oRecursive && (r = r.replace(new RegExp("(" + oRecursive.digit + "(.*" + oRecursive.digit + ")?)"), "($1)?").replace(new RegExp(oRecursive.digit, "g"), oRecursive.pattern)), 
                                new RegExp(r);
                            },
                            destroyEvents: function() {
                                el.off("keydown.mask keyup.mask paste.mask drop.mask change.mask blur.mask focusout.mask").removeData("changeCalled");
                            },
                            val: function(v) {
                                var isInput = el.is("input");
                                return arguments.length > 0 ? isInput ? el.val(v) : el.text(v) : isInput ? el.val() : el.text();
                            },
                            getMaskCharactersBeforeCount: function(index, onCleanVal) {
                                for (var count = 0, i = 0, maskL = mask.length; i < maskL && i < index; i++) jMask.translation[mask.charAt(i)] || (index = onCleanVal ? index + 1 : index, 
                                count++);
                                return count;
                            },
                            determineCaretPos: function(originalCaretPos, oldLength, newLength, maskDif) {
                                var translation = jMask.translation[mask.charAt(Math.min(originalCaretPos - 1, mask.length - 1))];
                                return translation ? Math.min(originalCaretPos + newLength - oldLength - maskDif, newLength) : p.determineCaretPos(originalCaretPos + 1, oldLength, newLength, maskDif);
                            },
                            behaviour: function(e) {
                                e = e || window.event;
                                var keyCode = e.keyCode || e.which;
                                if ($.inArray(keyCode, jMask.byPassKeys) === -1) {
                                    var caretPos = p.getCaret(), currVal = p.val(), currValL = currVal.length, changeCaret = caretPos < currValL, newVal = p.getMasked(), newValL = newVal.length, maskDif = p.getMaskCharactersBeforeCount(newValL - 1) - p.getMaskCharactersBeforeCount(currValL - 1);
                                    return newVal !== currVal && p.val(newVal), !changeCaret || 65 === keyCode && e.ctrlKey || (8 !== keyCode && 46 !== keyCode && (caretPos = p.determineCaretPos(caretPos, currValL, newValL, maskDif)), 
                                    p.setCaret(caretPos)), p.callbacks(e);
                                }
                            },
                            getMasked: function(skipMaskChars) {
                                var lastMaskChar, check, buf = [], value = p.val(), m = 0, maskLen = mask.length, v = 0, valLen = value.length, offset = 1, addMethod = "push", resetPos = -1;
                                for (options.reverse ? (addMethod = "unshift", offset = -1, lastMaskChar = 0, m = maskLen - 1, 
                                v = valLen - 1, check = function() {
                                    return m > -1 && v > -1;
                                }) : (lastMaskChar = maskLen - 1, check = function() {
                                    return m < maskLen && v < valLen;
                                }); check(); ) {
                                    var maskDigit = mask.charAt(m), valDigit = value.charAt(v), translation = jMask.translation[maskDigit];
                                    translation ? (valDigit.match(translation.pattern) ? (buf[addMethod](valDigit), 
                                    translation.recursive && (resetPos === -1 ? resetPos = m : m === lastMaskChar && (m = resetPos - offset), 
                                    lastMaskChar === resetPos && (m -= offset)), m += offset) : translation.optional && (m += offset, 
                                    v -= offset), v += offset) : (skipMaskChars || buf[addMethod](maskDigit), valDigit === maskDigit && (v += offset), 
                                    m += offset);
                                }
                                var lastMaskCharDigit = mask.charAt(lastMaskChar);
                                return maskLen !== valLen + 1 || jMask.translation[lastMaskCharDigit] || buf.push(lastMaskCharDigit), 
                                buf.join("");
                            },
                            callbacks: function(e) {
                                var val = p.val(), changed = p.val() !== old_value;
                                changed === !0 && "function" == typeof options.onChange && options.onChange(val, e, el, options), 
                                changed === !0 && "function" == typeof options.onKeyPress && options.onKeyPress(val, e, el, options), 
                                "function" == typeof options.onComplete && val.length === mask.length && options.onComplete(val, e, el, options);
                            }
                        };
                        jMask.remove = function() {
                            var caret = p.getCaret(), maskedCharacterCountBefore = p.getMaskCharactersBeforeCount(caret);
                            p.destroyEvents(), p.val(jMask.getCleanVal()).removeAttr("maxlength"), p.setCaret(caret - maskedCharacterCountBefore);
                        }, jMask.getCleanVal = function() {
                            return p.getMasked(!0);
                        }, jMask.init();
                    };
                    $.fn.mask = function(mask, options) {
                        return this.unmask(), this.each(function() {
                            $(this).data("mask", new Mask(this, mask, options));
                        });
                    }, $.fn.unmask = function() {
                        return this.each(function() {
                            try {
                                $(this).data("mask").remove();
                            } catch (e) {}
                        });
                    }, $.fn.cleanVal = function() {
                        return $(this).data("mask").getCleanVal();
                    }, $("*[data-mask]").each(function() {
                        var input = $(this), options = {}, prefix = "data-mask-";
                        "true" === input.attr(prefix + "reverse") && (options.reverse = !0), "false" === input.attr(prefix + "maxlength") && (options.maxlength = !1), 
                        "true" === input.attr(prefix + "clearifnotmatch") && (options.clearIfNotMatch = !0), 
                        input.mask(input.attr("data-mask"), options);
                    });
                }), function($) {
                    function setTimeVal(elm, sel, $tpDiv, settings, matchRegex) {
                        "" != $(sel).text() && $(sel).text().match(matchRegex).length && (elm.value = $(sel).text().match(matchRegex)[0], 
                        $(elm).attr("data-tz", $(sel).attr("data-tz"))), $(elm).change(), $.browser.msie || elm.focus(), 
                        $tpDiv.hide();
                    }
                    function formatTime(time, settings) {
                        var h = time.getHours(), hours = settings.show24Hours ? h : (h + 11) % 12 + 1, minutes = time.getMinutes();
                        return (settings.show24Hours ? formatNumber(hours) : hours) + settings.separator + formatNumber(minutes) + (settings.show24Hours ? "" : h < 12 ? " <span>AM</span>" : " <span>PM</span>");
                    }
                    function formatNumber(value) {
                        return (value < 10 ? "0" : "") + value;
                    }
                    function timeToDate(input, settings) {
                        return "object" == typeof input ? normaliseTime(input) : timeStringToDate(input, settings);
                    }
                    function timeStringToDate(input, settings) {
                        if (input) {
                            var array = input.split(settings.separator), hours = parseFloat(array[0]), minutes = parseFloat(array[1]);
                            settings.show24Hours || (12 === hours && input.indexOf("AM") !== -1 ? hours = 0 : 12 !== hours && input.indexOf("PM") !== -1 && (hours += 12));
                            var time = new Date(0, 0, 0, hours, minutes, 0);
                            return normaliseTime(time);
                        }
                        return null;
                    }
                    function normaliseTime(time) {
                        return time.setFullYear(2001), time.setMonth(0), time.setDate(0), time;
                    }
                    $.fn.timePicker = function(options) {
                        var settings = $.extend({}, $.fn.timePicker.defaults, options);
                        return this.each(function() {
                            $.timePicker(this, settings);
                        });
                    }, $.timePicker = function(elm, settings) {
                        var e = $(elm)[0];
                        return e.timePicker || (e.timePicker = new $._timePicker(e, settings));
                    }, $.timePicker.version = "0.3", $._timePicker = function(elm, settings) {
                        var tpOver = !1, keyDown = !1, startTime = timeToDate(settings.startTime, settings), endTime = timeToDate(settings.endTime, settings), matchRegex = settings.matchRegex, selectedClass = "selected", selectedSelector = "li." + selectedClass, defaultValue = settings.defaultValue;
                        $(elm).attr("autocomplete", "OFF");
                        for (var times = [], time = new Date(startTime); time <= endTime; ) times[times.length] = formatTime(time, settings), 
                        time = new Date(time.setMinutes(time.getMinutes() + settings.step));
                        for (var $tpDiv = $('<div class="time-picker' + (settings.show24Hours ? "" : " time-picker-12hours") + '"></div>'), $tpList = $("<ul></ul>"), i = 0; i < times.length; i++) $tpList.append("<li>" + times[i] + "</li>");
                        $tpDiv.append($tpList), $tpDiv.appendTo("body").hide(), $tpDiv.mouseover(function() {
                            tpOver = !0;
                        }).mouseout(function() {
                            tpOver = !1;
                        }), $($tpList).delegate("li", "mouseover", function() {
                            keyDown || ($(selectedSelector, $tpDiv).removeClass(selectedClass), $(this).addClass(selectedClass));
                        }).delegate("li", "mousedown", function() {
                            tpOver = !0;
                        }).delegate("li", "click", function() {
                            setTimeVal(elm, this, $tpDiv, settings, matchRegex), tpOver = !1;
                        });
                        var showPicker = function() {
                            if ($tpDiv.is(":visible")) return !1;
                            $("li", $tpDiv).removeClass(selectedClass);
                            var elmOffset = $(elm).offset();
                            return $tpDiv.css({
                                top: elmOffset.top + elm.offsetHeight,
                                left: elmOffset.left,
                                "z-index": 1e3
                            }), $tpDiv.show(), elm.value.length > 4 ? findValue = elm.value : defaultValue && (findValue = defaultValue), 
                            findValue && ($matchedTime = $("li:contains('" + findValue + "'):first", $tpDiv), 
                            $matchedTime.length && ($matchedTime.addClass(selectedClass), $tpDiv[0].scrollTop = $matchedTime[0].offsetTop)), 
                            !0;
                        };
                        $(elm).focus(showPicker).click(showPicker), $(elm).blur(function() {
                            tpOver || $tpDiv.hide();
                        });
                        var event = $.browser.opera || $.browser.mozilla ? "keypress" : "keydown";
                        $(elm)[event](function(e) {
                            var $selected;
                            keyDown = !0;
                            var top = $tpDiv[0].scrollTop;
                            switch (e.keyCode) {
                              case 38:
                                if (showPicker()) return !1;
                                $selected = $(selectedSelector, $tpList);
                                var prev = $selected.prev().addClass(selectedClass)[0];
                                return prev ? ($selected.removeClass(selectedClass), prev.offsetTop < top && ($tpDiv[0].scrollTop = top - prev.offsetHeight)) : ($selected.removeClass(selectedClass), 
                                prev = $("li:last", $tpList).addClass(selectedClass)[0], $tpDiv[0].scrollTop = prev.offsetTop - prev.offsetHeight), 
                                !1;

                              case 40:
                                if (showPicker()) return !1;
                                $selected = $(selectedSelector, $tpList);
                                var next = $selected.next().addClass(selectedClass)[0];
                                return next ? ($selected.removeClass(selectedClass), next.offsetTop + next.offsetHeight > top + $tpDiv[0].offsetHeight && ($tpDiv[0].scrollTop = top + next.offsetHeight)) : ($selected.removeClass(selectedClass), 
                                next = $("li:first", $tpList).addClass(selectedClass)[0], $tpDiv[0].scrollTop = 0), 
                                !1;

                              case 13:
                                if ($tpDiv.is(":visible")) {
                                    var sel = $(selectedSelector, $tpList)[0];
                                    setTimeVal(elm, sel, $tpDiv, settings, matchRegex);
                                }
                                return !1;

                              case 27:
                                return $tpDiv.hide(), !1;

                              default:
                                regex = new RegExp("^[012]?[0-9][:.][0-5][0-9] ?([APap][Mm])?"), setTimeout(function() {
                                    $(elm).val().match(regex) && $tpDiv.hide();
                                }, 200);
                            }
                            return !0;
                        }), $(elm).keyup(function(e) {
                            keyDown = !1;
                        }), this.getTime = function() {
                            return timeStringToDate(elm.value, settings);
                        }, this.setTime = function(time) {
                            elm.value = formatTime(timeToDate(time, settings), settings), $(elm).change();
                        };
                    }, $.fn.timePicker.defaults = {
                        step: 30,
                        startTime: new Date(0, 0, 0, 0, 0, 0),
                        endTime: new Date(0, 0, 0, 23, 30, 0),
                        separator: ":",
                        show24Hours: !0,
                        matchRegex: new RegExp(".+")
                    };
                }(jQuery);
                var dateTimeParserExamples;
                dateTimeParserExamples = [ "tomorrow morning in Paris", "Wed @2PM", "Friday afternoon", "in 2 days at 10", "two hours later", "Tokyo 8AM", "2h 30m", "in 3 hours", "in the evening", "Aug 22nd late morning", "2014-08-27", "15 Oct 2014 10:00", "next week", "after 30 mins", "a month later", "Sunday 10pm New York", "Thu at noon", "06/21/2014 9.00 AM", "3 days later at 8.30am", "in two weeks", "Dec 29th 11pm", "in the morning", "14:30", "1PM in Boston", "Fri at 9AM", "in 2 days at 8am", "11.00 on Apr 21", "today 6:00 PM in London", "monday in the afternoon", "90 mins later", "next weekday at 9am", "at midnight", "early morning in Sydney", "in 2 weekdays", "next Wed 10:00", "this afternoon", "1.5 hours later", "in 2.5 hours", "in Spain 2p", "8p Berlin", "6/14 at 8pm", "8/3 7a Sydney", "Mon 8am Austin", "5 weekdays later at 10:30", "Monday around 9PM", "tomorrow around 5.30 pm", "next weekday around 10AM", "around 1PM in Seattle", "next morning", "this evening" ];
                var DateTimeParser, bind = function(fn, me) {
                    return function() {
                        return fn.apply(me, arguments);
                    };
                };
                DateTimeParser = function() {
                    function DateTimeParser() {
                        this.getMoment = bind(this.getMoment, this);
                        var index, processRegexAction, regexDateParts, regexDefinition, regexDurationParts, regexTimeParts, textDefintion;
                        textDefintion = {
                            numbers: {
                                "half a": .5,
                                "half an": .5,
                                a: 1,
                                an: 1,
                                one: 1,
                                two: 2,
                                three: 3,
                                threee: 3,
                                thre: 3,
                                four: 4,
                                five: 5,
                                six: 6,
                                seven: 7,
                                eight: 8,
                                eigth: 8,
                                nine: 9,
                                ten: 10,
                                eleven: 11,
                                twelve: 12
                            },
                            months: {
                                january: 0,
                                janaury: 0,
                                february: 1,
                                febraury: 1,
                                march: 2,
                                april: 3,
                                may: 4,
                                june: 5,
                                july: 6,
                                august: 7,
                                september: 8,
                                october: 9,
                                november: 10,
                                december: 11,
                                jan: 0,
                                feb: 1,
                                mar: 2,
                                apr: 3,
                                jun: 5,
                                jul: 6,
                                aug: 7,
                                sep: 8,
                                sept: 8,
                                oct: 9,
                                nov: 10,
                                dec: 11
                            },
                            days: {
                                sunday: 0,
                                monday: 1,
                                tuesday: 2,
                                teusday: 2,
                                wednesday: 3,
                                thursday: 4,
                                thurdsay: 4,
                                friday: 5,
                                saturday: 6,
                                sun: 0,
                                mon: 1,
                                tue: 2,
                                tues: 2,
                                wed: 3,
                                thu: 4,
                                fri: 5,
                                sat: 6
                            },
                            timezones: Object.keys(timezoneLinks)
                        }, regexDefinition = {
                            time: [ {
                                regex: /(?:at |@ ?)?\b(around |about )?([012][0-9]|[0-9])(?:[.:]([0-5][0-9]))?( ?P(?:\.?M\.?)?|p(?:\.?m\.?)?)?( ?A(?:\.?M\.?)?|a(?:\.?m\.?)?)? ?(?:\(?(?:GMT)?(?:([+-])([01][0-9]):?([034][0-5]))\)?)?/,
                                action: function(matches, i, m) {
                                    var hour, isAM, isAround, isPM, minute, timeZoneSign, timezoneDiff, timezoneHour, timezoneMinute;
                                    return isAround = matches[i + 1], hour = parseInt(matches[i + 2]), minute = parseInt(matches[i + 3] || 0), 
                                    isPM = null != matches[i + 4], isAM = null != matches[i + 5], timezoneDiff = 0, 
                                    matches[i + 7] && (timeZoneSign = matches[i + 6], timezoneHour = parseInt(matches[i + 7]) || 0, 
                                    timezoneMinute = parseInt(matches[i + 8]) || 0, timezoneDiff = (60 * timezoneHour + timezoneMinute) * ("-" === timeZoneSign ? -1 : 1) + moment().zone()), 
                                    isPM && hour < 12 && (hour += 12), isAM && 12 === hour && (hour = 0), m.hour(hour).minute(minute).second(0).add(timezoneDiff, "minute"), 
                                    isAround && m.add(Math.floor(60 * Math.random()) - 30, "minute"), m;
                                }
                            }, {
                                regex: /(?:in the )?(?:(?:(early)|(late)) )?(?:(?:this|next) )?morning/,
                                action: function(matches, i, m) {
                                    var isEarly, isLate;
                                    return isEarly = null != matches[i + 1], isLate = null != matches[i + 2], isEarly ? m.hour(6).startOf("hour") : isLate ? m.hour(10).startOf("hour") : m.hour(8).startOf("hour");
                                }
                            }, {
                                regex: /(?:at )?noon/,
                                action: function(matches, i, m) {
                                    return m.hour(12).startOf("hour");
                                }
                            }, {
                                regex: /(?:in the )?(?:(?:(early)|(late)) )?(?:(?:this|next) )?afternoon/,
                                action: function(matches, i, m) {
                                    var isEarly, isLate;
                                    return isEarly = null != matches[i + 1], isLate = null != matches[i + 2], isEarly ? m.hour(2).startOf("hour") : isLate ? m.hour(17).startOf("hour") : m.hour(15).startOf("hour");
                                }
                            }, {
                                regex: /(?:(?:in|at) the )?(?:(?:(early)|(late)) )?(?:(?:this|next) )?evening/,
                                action: function(matches, i, m) {
                                    var isEarly, isLate;
                                    return isEarly = null != matches[i + 1], isLate = null != matches[i + 2], isEarly ? m.hour(19).startOf("hour") : isLate ? m.hour(18).startOf("hour") : m.hour(20).startOf("hour");
                                }
                            }, {
                                regex: /(at )?(?:(?:(early)|(late)) )?(?:(?:this|next) )?night/,
                                action: function(matches, i, m) {
                                    var isEarly, isLate;
                                    return isEarly = null != matches[i + 1], isLate = null != matches[i + 2], isEarly ? m.hour(21).startOf("hour") : isLate ? m.hour(20).startOf("hour") : m.hour(22).startOf("hour");
                                }
                            }, {
                                regex: /(?:at )?(?:(?:this|next) )?midnight/,
                                action: function(matches, i, m) {
                                    return m.endOf("day");
                                }
                            } ],
                            day: [ {
                                regex: /(?:(today|todya))/,
                                action: function(matches, i, m) {
                                    return m;
                                }
                            }, {
                                regex: /(?:(tomorrow|tomorrrow|tomarrow|tommorow|tommorrow|tomorow))/,
                                action: function(matches, i, m) {
                                    return m.add(1, "day");
                                }
                            }, {
                                regex: /(next weekday)/,
                                action: function(matches, i, m) {
                                    var ref;
                                    return 5 === (ref = moment().isoWeekday()) || 6 === ref ? m.day(8) : m.add(1, "day");
                                }
                            }, {
                                regex: /(next week)/,
                                action: function(matches, i, m) {
                                    return m.day(8);
                                }
                            }, {
                                regex: /(?:(?:on|(?:this|next)) )?(DAYS),?/,
                                action: function(matches, i, m) {
                                    var dayOfWeek, textDay;
                                    return textDay = matches[i + 1], dayOfWeek = parseInt(textDefintion.days[textDay.toLowerCase()]), 
                                    dayOfWeek <= moment().day() && (dayOfWeek += 7), m.day(dayOfWeek);
                                }
                            }, {
                                regex: /(?:on )?(?:(?:([0-3]?[0-9])(?:st|nd|rd|th)? (MONTHS))|(?:(MONTHS) ([0-3]?[0-9])(?:st|nd|rd|th)?)),? ?(201[3-9])?/,
                                action: function(matches, i, m) {
                                    var date, month, textMonth, year;
                                    return textMonth = matches[i + 2] || matches[i + 3], month = textDefintion.months[textMonth.toLowerCase()], 
                                    date = matches[i + 1] || matches[i + 4], year = matches[i + 5] || new Date().getFullYear(), 
                                    m.year(year).month(month).date(date);
                                }
                            }, {
                                regex: /(201[3-9])[.\-\/]([01]?[0-9])[.\-\/]([0-3]?[0-9])/,
                                action: function(matches, i, m) {
                                    var date, month, year;
                                    return month = parseInt(matches[i + 2]) - 1, date = matches[i + 3], year = matches[i + 1], 
                                    m.year(year).month(month).date(date);
                                }
                            }, {
                                regex: /([01]?[0-9])[.\-\/]([0-3]?[0-9])[.\-\/](201[3-9])/,
                                action: function(matches, i, m) {
                                    var date, month, year;
                                    return month = parseInt(matches[i + 1]) - 1, date = matches[i + 2], year = matches[i + 3], 
                                    m.year(year).month(month).date(date);
                                }
                            }, {
                                regex: /(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])/,
                                action: function(matches, i, m) {
                                    var date, month, year;
                                    return month = parseInt(matches[i + 1]) - 1, date = matches[i + 2], year = new Date().getFullYear(), 
                                    m.year(year).month(month).date(date);
                                }
                            } ],
                            duration: [ {
                                regex: /(?:(?:in|after) )?(?:(NUMBERS)|([1-3])) ?(?:years|year)(?: later)?/,
                                action: function(matches, i, m) {
                                    var yearsLater;
                                    return yearsLater = parseInt(matches[i + 2] || textDefintion.numbers[matches[i + 1].toLowerCase()]), 
                                    m.add(yearsLater, "year");
                                }
                            }, {
                                regex: /(?:(?:in|after) )?(?:(NUMBERS)|([1-9][0-9]{0,2})) ?(?:months|month|mth)(?: later)?/,
                                action: function(matches, i, m) {
                                    var monthsLater;
                                    return monthsLater = parseInt(matches[i + 2] || textDefintion.numbers[matches[i + 1].toLowerCase()]), 
                                    m.add(monthsLater, "month");
                                }
                            }, {
                                regex: /(?:(?:in|after) )?(?:(NUMBERS)|([1-9][0-9]{0,2})) ?(?:weeks|week)(?: later)?/,
                                action: function(matches, i, m) {
                                    var weeksLater;
                                    return weeksLater = parseInt(matches[i + 2] || textDefintion.numbers[matches[i + 1].toLowerCase()]), 
                                    m.add(weeksLater, "week");
                                }
                            }, {
                                regex: /(?:(?:in|after) )?(?:(NUMBERS)|([1-9][0-9]{0,2})) ?(?:days|day|d)(?: later)?/,
                                action: function(matches, i, m) {
                                    var daysLater;
                                    return daysLater = parseInt(matches[i + 2] || textDefintion.numbers[matches[i + 1].toLowerCase()]), 
                                    m.add(daysLater, "day");
                                }
                            }, {
                                regex: /(?:(?:in|after) )?(?:(NUMBERS)|([1-9][0-9]{0,2})) ?(?:weekdays|weekday)(?: later)?/,
                                action: function(matches, i, m) {
                                    var j, ref, weekdaysLater;
                                    for (weekdaysLater = parseInt(matches[i + 2] || textDefintion.numbers[matches[i + 1].toLowerCase()]), 
                                    i = j = 1, ref = weekdaysLater; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) m.add(1, "day"), 
                                    m.isoWeekday() > 5 && m.add(2, "day");
                                    return m;
                                }
                            }, {
                                regex: /(?:(?:in|after) )?(?:(NUMBERS)|([1-9][0-9]?(?:[,.][0-9])?)) ?(?:hrs|hr|hours|hour|h|housr)(?: later)?/,
                                action: function(matches, i, m) {
                                    var hoursLater;
                                    return hoursLater = parseFloat(matches[i + 2] || textDefintion.numbers[matches[i + 1].toLowerCase()]), 
                                    m.add(hoursLater, "hour");
                                }
                            }, {
                                regex: /(?:(?:in|after) )?(?:(NUMBERS)|([1-9][0-9]{0,2})) ?(?:mins|min|minutes|minute|m|mintues)(?: later)?/,
                                action: function(matches, i, m) {
                                    var minutesLater;
                                    return minutesLater = parseInt(matches[i + 2] || textDefintion.numbers[matches[i + 1].toLowerCase()]), 
                                    m.add(minutesLater, "minute");
                                }
                            }, {
                                regex: /(?:(?:in|after) )?(?:(NUMBERS)|([1-9][0-9]{0,2})) ?(?:secs|sec|seconds|second|s)(?: later)?/,
                                action: function(matches, i, m) {
                                    var secondsLater;
                                    return secondsLater = parseInt(matches[i + 2] || textDefintion.numbers[matches[i + 1].toLowerCase()]), 
                                    m.add(secondsLater, "second");
                                }
                            } ],
                            timezone: {
                                regex: /(?:(?:(?: )?(?:in|at|@) )?(ZONES) ?)?/,
                                action: function(_this) {
                                    return function(matches, i, m) {
                                        return m;
                                    };
                                }(this)
                            }
                        }, regexDateParts = [], regexTimeParts = [], regexDurationParts = [], this.regexActions = [], 
                        index = 0, processRegexAction = function(_this) {
                            return function(item) {
                                var ref, ref1, ref2;
                                if (index++, _this.regexActions[index] = item.action, 1 !== index && 104 !== index) return index += (null != (ref = item.regex.source.match(/\(/g)) ? ref.length : void 0) - ((null != (ref1 = item.regex.source.match(/\(\?:/g)) ? ref1.length : void 0) || 0) - ((null != (ref2 = item.regex.source.match(/\\\(/g)) ? ref2.length : void 0) || 0) || 0;
                            };
                        }(this), processRegexAction(regexDefinition.timezone), regexDefinition.day.forEach(function(item) {
                            return processRegexAction(item), regexDateParts.push(item.regex.source);
                        }), regexDefinition.time.forEach(function(item) {
                            return processRegexAction(item), regexTimeParts.push(item.regex.source);
                        }), regexDefinition.time.forEach(function(item) {
                            return processRegexAction(item);
                        }), regexDefinition.day.forEach(function(item) {
                            return processRegexAction(item);
                        }), processRegexAction(regexDefinition.timezone), regexDefinition.duration.forEach(function(item) {
                            return processRegexAction(item), regexDurationParts.push(item.regex.source);
                        }), regexDefinition.time.forEach(function(item) {
                            return processRegexAction(item);
                        }), this.regex = new RegExp(("^(?: +(?=\\S))?(?:(?:" + regexDefinition.timezone.regex.source + "(?:(?:(?:(?:(" + regexDateParts.join(")|(") + "))[, ]{1,2})?(?:(" + regexTimeParts.join(")|(") + ")))|(?:(?:(?:(" + regexTimeParts.join(")|(") + "))[, ]{1,2})?(?:(" + regexDateParts.join(")|(") + "))))" + regexDefinition.timezone.regex.source + ")|(?:(?:(" + regexDurationParts.join("(?: and)? ?)?(") + ")?)(?:(" + regexTimeParts.join(")|(") + "))?)) *?$").replace(/NUMBERS/g, Object.keys(textDefintion.numbers).join("|")).replace(/MONTHS/g, Object.keys(textDefintion.months).join("|")).replace(/DAYS/g, Object.keys(textDefintion.days).join("|")).replace(/ZONES/g, textDefintion.timezones.join("|")), "i");
                    }
                    return DateTimeParser.prototype.getMoment = function(string) {
                        var currentZone, diff, index, j, len, m, match, matches, ref, typedZone;
                        if (matches = this.regex.exec(string)) {
                            for (m = moment(), typedZone = matches[1] || matches[104], typedZone && (currentZone = m.zone(), 
                            m.tz(typedZone)), ref = matches || [], index = j = 0, len = ref.length; j < len; index = ++j) match = ref[index], 
                            match && this.regexActions[index] && (m = this.regexActions[index](matches, index, m));
                            return m.format("HH:m") === moment().format("HH:m") && m.hour(8).minute(0).second(0), 
                            matches[10] && m.clone().add(-7, "day") > moment() && m.add(-7, "day"), diff = m.diff(moment(), "days", !0), 
                            -1 <= diff && diff < 0 ? m.add(1, "day") : diff < -1 && m.add(1, "year"), typedZone ? m.zone(currentZone) : m;
                        }
                    }, DateTimeParser;
                }();
                var timezoneLinks;
                timezoneLinks = {
                    "New York": "America/Detroit",
                    "Los Angeles": "America/Dawson",
                    Chicago: "America/Chicago",
                    Houston: "America/Chicago",
                    Philadelphia: "America/Detroit",
                    Phoenix: "America/Creston",
                    "San Antonio": "America/Chicago",
                    "San Diego": "America/Dawson",
                    Dallas: "America/Chicago",
                    "San Jose": "America/Dawson",
                    Austin: "America/Chicago",
                    Jacksonville: "America/Detroit",
                    Indianapolis: "America/Detroit",
                    "San Francisco": "America/Dawson",
                    Columbus: "America/Detroit",
                    "Fort Worth": "America/Chicago",
                    Charlotte: "America/Detroit",
                    Detroit: "America/Detroit",
                    "El Paso": "America/Boise",
                    Memphis: "America/Chicago",
                    Boston: "America/Detroit",
                    Seattle: "America/Dawson",
                    Denver: "America/Boise",
                    "Washington D.C.": "America/Detroit",
                    Nashville: "America/Chicago",
                    Baltimore: "America/Detroit",
                    Louisville: "America/Detroit",
                    Portland: "America/Dawson",
                    "Oklahoma City": "America/Chicago",
                    Milwaukee: "America/Chicago",
                    "Las Vegas": "America/Dawson",
                    Albuquerque: "America/Boise",
                    Sacramento: "America/Dawson",
                    Atlanta: "America/Detroit",
                    Raleigh: "America/Detroit",
                    Honolulu: "HST",
                    Juneau: "America/Juneau",
                    Miami: "America/Detroit",
                    Istanbul: "Asia/Istanbul",
                    Turkey: "Asia/Istanbul",
                    Moscow: "Europe/Moscow",
                    London: "Europe/Belfast",
                    "United Kingdom": "Europe/Belfast",
                    UK: "Europe/Belfast",
                    "Saint Petersburg": "Europe/Moscow",
                    "St. Petersburg": "Europe/Moscow",
                    Berlin: "Africa/Ceuta",
                    Germany: "Africa/Ceuta",
                    Madrid: "Africa/Ceuta",
                    Spain: "Africa/Ceuta",
                    Rome: "Africa/Ceuta",
                    Italy: "Africa/Ceuta",
                    Paris: "Africa/Ceuta",
                    France: "Africa/Ceuta",
                    Minsk: "Europe/Kaliningrad",
                    Belarus: "Europe/Kaliningrad",
                    Bucharest: "Asia/Nicosia",
                    Romania: "Asia/Nicosia",
                    Budapest: "Africa/Ceuta",
                    Hungary: "Africa/Ceuta",
                    Hamburg: "Africa/Ceuta",
                    Vienna: "Africa/Ceuta",
                    Austria: "Africa/Ceuta",
                    Warsaw: "Africa/Ceuta",
                    Poland: "Africa/Ceuta",
                    Belgrade: "Africa/Ceuta",
                    Serbia: "Africa/Ceuta",
                    Barcelona: "Africa/Ceuta",
                    Munich: "Africa/Ceuta",
                    Milan: "Africa/Ceuta",
                    Prague: "Africa/Ceuta",
                    "Czech Republic": "Africa/Ceuta",
                    Ukraine: "Asia/Nicosia",
                    Kiev: "Asia/Nicosia",
                    Netherlands: "Africa/Ceuta",
                    Amsterdam: "Africa/Ceuta",
                    Belgium: "Africa/Ceuta",
                    Brussels: "Africa/Ceuta",
                    Greece: "Asia/Nicosia",
                    Athens: "Asia/Nicosia",
                    Portugal: "Europe/Belfast",
                    Lisbon: "Europe/Belfast",
                    Sweden: "Africa/Ceuta",
                    Stockholm: "Africa/Ceuta",
                    Switzerland: "Africa/Ceuta",
                    Zurich: "Africa/Ceuta",
                    "Zürich": "Africa/Ceuta",
                    Bulgaria: "Asia/Nicosia",
                    Sofia: "Asia/Nicosia",
                    Denmark: "Africa/Ceuta",
                    Copenhagen: "Africa/Ceuta",
                    Finland: "Asia/Nicosia",
                    Helsinki: "Asia/Nicosia",
                    Slovakia: "Africa/Ceuta",
                    Bratislava: "Africa/Ceuta",
                    Norway: "Africa/Ceuta",
                    Oslo: "Africa/Ceuta",
                    Ireland: "Europe/Belfast",
                    Dublin: "Europe/Belfast",
                    Shanghai: "Asia/Chongqing",
                    Beijing: "Asia/Chongqing",
                    "Sao Paulo": "America/Sao_Paulo",
                    "Rio de Janeiro": "America/Sao_Paulo",
                    Delhi: "Asia/Calcutta",
                    India: "Asia/Calcutta",
                    Mumbai: "Asia/Calcutta",
                    Bangalore: "Asia/Calcutta",
                    Seoul: "Asia/Tokyo",
                    "South Korea": "Asia/Tokyo",
                    Jakarta: "Asia/Jakarta",
                    Tokyo: "Asia/Tokyo",
                    Japan: "Asia/Tokyo",
                    "Mexico City": "America/Cancun",
                    Bangkok: "Asia/Bangkok",
                    Thailand: "Asia/Bangkok",
                    Lima: "America/Lima",
                    Peru: "America/Lima",
                    "Hong Kong": "Asia/Chongqing",
                    Cairo: "Africa/Cairo",
                    Egypt: "Africa/Cairo",
                    Singapore: "Asia/Chongqing",
                    Toronto: "America/Detroit",
                    Montreal: "America/Detroit",
                    Calgary: "America/Boise",
                    Ottawa: "America/Detroit",
                    Edmonton: "America/Boise",
                    Mississauga: "America/Detroit",
                    Winnipeg: "America/Chicago",
                    Vancouver: "America/Dawson",
                    Sydney: "Australia/ACT",
                    Melbourne: "Australia/ACT",
                    Brisbane: "Australia/Brisbane",
                    Auckland: "Antarctica/McMurdo",
                    Dubai: "Asia/Dubai",
                    Frankfurt: "Africa/Ceuta",
                    "Buenos Aires": "America/Argentina/Buenos_Aires",
                    "Kuala Lumpur": "Asia/Chongqing",
                    Taipei: "Asia/Chongqing",
                    Santiago: "America/Santiago",
                    Chile: "America/Santiago",
                    Taiwan: "Asia/Chongqing",
                    Johannesburg: "Africa/Johannesburg",
                    "Tel Aviv": "Asia/Jerusalem",
                    Israel: "Asia/Jerusalem",
                    "America/New_York": "America/Detroit",
                    "America/Los_Angeles": "America/Dawson",
                    "America/Phoenix": "America/Creston",
                    "America/Denver": "America/Boise",
                    "Pacific/Honolulu": "HST",
                    "America/Juneau": "America/Anchorage",
                    "Europe/Istanbul": "Asia/Istanbul",
                    "Europe/London": "Europe/Belfast",
                    "Europe/Berlin": "Africa/Ceuta",
                    "Europe/Minsk": "Europe/Kaliningrad",
                    "Europe/Helsinki": "Asia/Nicosia",
                    "Asia/Shanghai": "Asia/Chongqing",
                    "Asia/Kolkata": "Asia/Calcutta",
                    "America/Mexico_City": "America/Cancun",
                    "Australia/Sydney": "Australia/ACT",
                    "Pacific/Auckland": "Antarctica/McMurdo"
                };
                var RateLimit;
                RateLimit = function() {
                    function RateLimit(maxOps, interval, allowBursts) {
                        this.maxRate = allowBursts ? maxOps : maxOps / interval, this.interval = interval, 
                        this.allowBursts = allowBursts, this.numOps = 0, this.start = new Date().getTime(), 
                        this.queue = [];
                    }
                    return RateLimit.prototype.run = function(fn) {
                        var elapsed, now, rate;
                        return rate = 0, now = new Date().getTime(), elapsed = now - this.start, elapsed > this.interval && (this.numOps = 0, 
                        this.start = now), rate = this.numOps / (this.allowBursts ? 1 : elapsed), rate < this.maxRate ? 0 === this.queue.length ? (this.numOps++, 
                        fn()) : (fn && this.queue.push(fn), this.numOps++, this.queue.shift()()) : (fn && this.queue.push(fn), 
                        setTimeout(function(_this) {
                            return function() {
                                return _this.run();
                            };
                        }(this), 1 / this.maxRate));
                    }, RateLimit;
                }();
                var RiRecur, XMLHttpCallback, addNote, addNoteAction, addNotePrefs, cancelRecurringEmailAction, cancelScheduledEmail, checkForNotificationMessage, checkSentNotificationMessage, checkboxStatus, clearReplacementBoxId, clearScheduledRecurringLabels, delLocalPrefs, deleteNote, deleteNoteAction, detectIfConversaionViewModeEnabled, disableAddNoteButton, disableForUser, disablePrompt, disableReminderButton, disabledUserCheck, dispatchKeyEvent, dispatchKeyboardEvent, dispatchMouseEvent, emailReminderPrefs, enableAddNoteButton, enableAddNoteButtonForThreadId, enableImapSetting, enableRecurringButton, enableReminderButton, enableReminderButtonForThreadId, enableSendLaterButton, extendWithComposeHeaders, finishedNotifications, generateCustomTimeOptions, getAddNoteButton, getAddNotePrefButton, getCanvasScope, getDraftThreadId, getEditable, getElementValues, getGmailUser, getLocalPrefs, getParentWin, getRecurringButton, getRecurringEmailId, getRecurringPrefButton, getReminderButton, getReminderPrefButton, getScheduledEmailDetails, getSendLaterButton, getSendLaterPrefButton, getThreadId, getThreadIdLastInConversation, goals, handleHashChange, handleUserPrefs, hideNotification, inProgressNotifications, init, isComposeWindow, isConversaionViewModeEnabled, isInsideEmail, isReplyScreen, isSplitView, isTestEnvironment, jsLog, logRateLimit, modelBox, objectDiff, overrideNativeCloseFunctions, placeButtons, placeDisabledUserAction, placeRemindMeButton, pleaseWait, postJqp, randomId, recurringEmail, recurringEmailAction, recurringPrefs, redirectToAuth, refreshInbox, remindEmail, remindEmailAction, removeSentNotificationMessageAction, replaceSendNowButton, replaceSubjectBox, requestXMLHttp, ri, saveCustomTimes, scheduleEmail, scheduleSend, sendLaterAction, sendLaterPrefs, sentNotificationMessageActions, setLocalPrefs, shareOnNetwork, showDetailedDatePickerWindow, showFinishedNotification, showInProgressNotification, showMenuCustomizationWindow, showNotification, showRecurringDatePickerWindow, showTooltip, simulateClick, simulateKeydown, simulateMouseover, sortCustomTimes, toggleAddNote, toggleRecurring, toggleReminder, toggleSendLater, uiButton, uiMenu, unRemindEmail, updateNoteThreadId, updateReminderThreadId, updateSubject, uuid, whenGmailUILoaded;
                return RiRecur = function() {
                    function RiRecur(data1) {
                        this.data = data1, this.ordinalNames = {
                            1: "first",
                            2: "second",
                            3: "third",
                            4: "fourth",
                            "-1": "last"
                        }, null != this.data.dayOfWeek && _.isString(this.data.dayOfWeek) && (this.data.dayOfWeek = this.data.dayOfWeek.split(",").map(function(day) {
                            return parseInt(day);
                        })), null != this.data.dayOfMonth && (this.data.dayOfMonth = parseInt(this.data.dayOfMonth)), 
                        null != this.data.weekOfMonth && (this.data.weekOfMonth = parseInt(this.data.weekOfMonth)), 
                        null != this.data.dayOfWeekInMonth && (this.data.dayOfWeekInMonth = parseInt(this.data.dayOfWeekInMonth)), 
                        this.data.recurs = parseInt(this.data.recurs);
                    }
                    var _;
                    return null != _u && (_ = _u), RiRecur.prototype.next = function(now, cb) {
                        var day, daysLeftInStartWeek, findDayOfWeekOccurrenceInMonth, l, len, occurrence, ref, ref1, referenceDate, startDate, startTimeCorrected;
                        if ("function" == typeof now && (cb = now, now = moment.tz(this.data.tz)), null == this.data.recurs || null == this.data.repeats) return cb("Missing attribute");
                        switch (startDate = moment.tz(this.data.startDate + this.data.sendTime, "YYYY-MM-DDHH:mm", this.data.tz), 
                        referenceDate = moment.max(moment(startDate), now), startTimeCorrected = function(_this) {
                            return function(toBeCorrected) {
                                var occurrence;
                                return occurrence = moment.tz(toBeCorrected, _this.data.tz), occurrence.hour(startDate.hour()), 
                                occurrence.minute(startDate.minute()), occurrence.seconds(0), occurrence;
                            };
                        }(this), findDayOfWeekOccurrenceInMonth = function(_this) {
                            return function(occurrence) {
                                var weekOfMonthCount;
                                if (_this.data.weekOfMonth !== -1) for (occurrence.startOf("month"), occurrence = startTimeCorrected(occurrence), 
                                weekOfMonthCount = 1; weekOfMonthCount < 10 && (occurrence.day() !== _this.data.dayOfWeekInMonth || weekOfMonthCount !== _this.data.weekOfMonth); ) occurrence.day() === _this.data.dayOfWeekInMonth && weekOfMonthCount !== _this.data.weekOfMonth && (weekOfMonthCount++, 
                                occurrence.add(1, "day")), occurrence.add(1, "day"); else for (occurrence.endOf("month"), 
                                occurrence = startTimeCorrected(occurrence); occurrence.day() !== _this.data.dayOfWeekInMonth; ) occurrence.add(-1, "day");
                                return occurrence;
                            };
                        }(this), this.data.repeats) {
                          case "daily":
                            if (1 !== this.data.recurs) for (occurrence = moment(startDate); occurrence.isBefore(referenceDate); ) occurrence.add(this.data.recurs, "day"), 
                            "true" === this.data.weekdaysOnly && (6 === occurrence.isoWeekday() ? occurrence.isoWeekday(8) : 7 === occurrence.isoWeekday() && occurrence.isoWeekday(9)); else occurrence = startTimeCorrected(referenceDate), 
                            occurrence.isBefore(referenceDate) ? (occurrence.add(1, "day"), occurrence.isoWeekday() > 5 && "true" === this.data.weekdaysOnly && occurrence.isoWeekday(8)) : occurrence.isoWeekday() > 5 && "true" === this.data.weekdaysOnly && occurrence.isoWeekday(8);
                            return cb(null, occurrence);

                          case "weekly":
                            if (1 !== this.data.recurs) for (occurrence = moment(startDate), daysLeftInStartWeek = _.filter(this.data.dayOfWeek, function(dayOfWeek) {
                                return dayOfWeek >= startDate.day();
                            }), daysLeftInStartWeek.length > 0 ? occurrence.day(_.min(daysLeftInStartWeek)) : (occurrence.day(_.min(this.data.dayOfWeek)), 
                            occurrence.add(1, "week")); occurrence.isBefore(referenceDate); ) {
                                for (occurrence.day(_.min(this.data.dayOfWeek)), ref = _.rest(this.data.dayOfWeek.sort()), 
                                l = 0, len = ref.length; l < len; l++) day = ref[l], occurrence.isBefore(referenceDate) && occurrence.day(day);
                                occurrence.isBefore(referenceDate) && (occurrence.add(this.data.recurs, "week"), 
                                occurrence.day(_.min(this.data.dayOfWeek)));
                            } else for (occurrence = startTimeCorrected(referenceDate); occurrence.isBefore(referenceDate) || (ref1 = occurrence.day(), 
                            indexOf.call(this.data.dayOfWeek, ref1) < 0); ) occurrence.add(1, "day");
                            return cb(null, occurrence);

                          case "monthly":
                            if (null != this.data.dayOfMonth || null != this.data.weekOfMonth && null != this.data.dayOfWeekInMonth) {
                                if (occurrence = 1 !== this.data.recurs ? moment(startDate) : startTimeCorrected(referenceDate), 
                                this.data.dayOfMonth) {
                                    for (this.data.dayOfMonth !== -1 ? occurrence.date(this.data.dayOfMonth) : occurrence.date(occurrence.daysInMonth()); occurrence.isBefore(startDate); ) occurrence.add(1, "month");
                                    for (;occurrence.isBefore(referenceDate); ) occurrence.add(this.data.recurs, "month");
                                    this.data.dayOfMonth === -1 && occurrence.date(occurrence.daysInMonth());
                                } else {
                                    for (occurrence = findDayOfWeekOccurrenceInMonth(occurrence); occurrence.isBefore(startDate); ) occurrence.add(1, "month"), 
                                    occurrence = findDayOfWeekOccurrenceInMonth(occurrence);
                                    for (;occurrence.isBefore(referenceDate); ) occurrence.add(this.data.recurs, "month"), 
                                    occurrence = findDayOfWeekOccurrenceInMonth(occurrence);
                                }
                                return cb(null, occurrence);
                            }
                            return logger.error("Missing attribute in recurring data: {}", this.data), cb(!0);

                          case "yearly":
                            if (null == this.data.month || null == this.data.dayOfMonth && (null == this.data.weekOfMonth || null == this.data.dayOfWeekInMonth)) return logger.error("Missing attribute in recurring data: {}", this.data), 
                            cb(!0);
                            if (occurrence = moment(startDate), occurrence.month(parseInt(this.data.month)), 
                            this.data.dayOfMonth) for (this.data.dayOfMonth !== -1 ? occurrence.date(this.data.dayOfMonth) : occurrence.date(occurrence.daysInMonth()); occurrence.isBefore(referenceDate); ) occurrence.add(1, "year"); else for (occurrence = findDayOfWeekOccurrenceInMonth(occurrence); occurrence.isBefore(referenceDate); ) occurrence.add(1, "year"), 
                            occurrence = findDayOfWeekOccurrenceInMonth(occurrence);
                            return cb(null, occurrence);
                        }
                    }, RiRecur.prototype.summary = function() {
                        var day, summary;
                        return summary = [], "daily" === this.data.repeats ? summary.push(("every " + this.data.recurs + " day").replace("1 ", "").replace("day", "true" === this.data.weekdaysOnly ? "weekday" : "day") + (parseInt(this.data.recurs) > 1 ? "s" : "")) : "weekly" === this.data.repeats ? (summary.push(("every " + this.data.recurs + " weeks").replace("1 weeks", "week")), 
                        summary.push("on " + function() {
                            var l, len, ref, results;
                            for (ref = this.data.dayOfWeek, results = [], l = 0, len = ref.length; l < len; l++) day = ref[l], 
                            results.push(moment.weekdaysShort()[day]);
                            return results;
                        }.call(this).join(", ").replace(/,([^,]+)$/, " and$1"))) : "monthly" === this.data.repeats ? this.data.dayOfMonth ? summary.push("on the " + moment.localeData().ordinal(this.data.dayOfMonth).replace("-1th", "last") + " day of every " + (this.data.recurs + " months").replace("1 months", "month")) : summary.push("on the " + this.ordinalNames[this.data.weekOfMonth] + " " + moment.weekdays()[this.data.dayOfWeekInMonth] + " of every " + (this.data.recurs + " months").replace("1 months", "month")) : this.data.dayOfMonth ? summary.push("on the " + moment.localeData().ordinal(this.data.dayOfMonth).replace("-1th", "last") + " day of every " + moment.months()[this.data.month]) : summary.push("on the " + this.ordinalNames[this.data.weekOfMonth] + " " + moment.weekdays()[this.data.dayOfWeekInMonth] + " of every " + moment.months()[this.data.month]), 
                        summary.push("at " + moment(this.data.sendTime, "HH:mm").format("h:mm A")), this.data.endDate ? summary.push("until " + moment(this.data.endDate, "YYYYMMDD").format("MMMM D, YYYY").replace(moment().format(", YYYY"), "")) : this.data.endOccurrences && summary.push("ends after " + this.data.endOccurrences + " occurrences"), 
                        summary.join(" ");
                    }, RiRecur;
                }(), jsLog = {}, ri = {
                    cliVersion: "8.7.0",
                    timeZones: [ [ "Pacific/Honolulu", "Hawaii" ], [ "America/Los_Angeles", "Pacific Time (US & Canada)" ], [ "America/Phoenix", "Phoenix" ], [ "America/Denver", "Mountain Time (US & Canada)" ], [ "America/Chicago", "Central Time (US & Canada)" ], [ "America/New_York", "Eastern Time (US & Canada)" ], [ "America/Santiago", "Santiago" ], [ "America/Sao_Paulo", "Brasilia, Sao Paulo, Rio de Janeiro" ], [ "America/Argentina/Buenos_Aires", "Buenos Aires, Georgetown" ], [ "Europe/London", "Dublin, Edinburgh, Lisbon, London" ], [ "Europe/Berlin", "Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna" ], [ "Europe/Berlin", "Belgrade, Bratislava, Budapest, Ljubljana, Prague" ], [ "Europe/Berlin", "Brussels, Copenhagen, Madrid, Paris" ], [ "Europe/Berlin", "Sarajevo, Skopje, Warsaw, Zagreb" ], [ "Africa/Cairo", "Cairo" ], [ "Asia/Jerusalem", "Jerusalem" ], [ "Europe/Helsinki", "Athens, Bucharest, Istanbul" ], [ "Europe/Helsinki", "Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius" ], [ "Europe/Minsk", "Minsk" ], [ "Europe/Moscow", "Moscow, St. Petersburg, Volgograd" ], [ "Asia/Kolkata", "Chennai, Kolkata, Mumbai, New Delhi" ], [ "Asia/Bangkok", "Bangkok, Hanoi, Jakarta" ], [ "Asia/Shanghai", "Beijing, Chongqing, Hong Kong, Urumqi" ], [ "Asia/Shanghai", "Kuala Lumpur, Singapore" ], [ "Asia/Shanghai", "Taipei" ], [ "Asia/Tokyo", "Osaka, Sapporo, Tokyo" ], [ "Asia/Tokyo", "Seoul" ], [ "Australia/Brisbane", "Brisbane" ], [ "Australia/Sydney", "Canberra, Melbourne, Sydney" ], [ "Pacific/Auckland", "Auckland, Wellington" ] ],
                    monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                    interval: {
                        composeHeaders: {},
                        sentNotificationMessage: null,
                        notification: null,
                        handleUserPrefs: null,
                        placeRemindMeButton: null,
                        splitViewPlaceRemindMeButton: null,
                        composeWindowEditWatch: {}
                    },
                    timeout: {
                        customDateKeyup: null
                    },
                    remindEmailData: {},
                    addNoteData: {},
                    scriptCallback: {},
                    i18n: {
                        compose: [ "compose", "tulis", "karang", "redacta", "napsat", "skriv", "schreiben", "koosta", "redactar", "idatzi", "bumuo", "nouveau message", "nova poruka", "scrivi", "skrifa póst", "tunga", "rakstīt", "sukurti", "levélírás", "opstellen", "skriv ny", "utwórz", "escrever", "compor", "scrie", "scrieţi", "scrieți", "napísať správu", "novo", "kirjoita", "skriv", "soạn", "e-posta yaz", "ΣΥΝΤΑΞΗ", "НАПИСАТЬ", "НОВА ПОРУКА", "НАПИСАТИ", "НОВО СЪОБЩЕНИЕ", "חבר הודעה", "إنشاء", "نوشتن", "تحریر کریں", "लिहा", "लिखें", "রচনা", "કંપોઝ", "எழுது", "సృష్టించు", "ರಚನೆ", "രചിക്കുക", "เขียน", "ጽሑፍ አቀናብር", "撰寫", "写邮件", "作成", "편지쓰기" ],
                        send: [ "send now", "send", "kirim", "hantar", "envia", "odeslat", "send", "senden", "saada", "enviar", "bidali", "ipadala", "envoyer", "pošalji", "invia", "senda", "tuma", "sūtīt", "siųsti", "küldés", "verzenden", "send", "wyślij", "enviar", "enviar", "trimite", "trimiteţi", "trimiteți", "odoslať", "pošlji", "lähetä", "skicka", "gửi", "gửi", "gönder", "Αποστολή", "Отправить", "Пошаљи", "Надіслати", "Изпращане", "שלח", "إرسال", "ارسال", "بھیجیں", "पाठवा", "भेजें", "প্রেরণ", "મોકલો", "அனுப்பு", "పంపించు", "ಕಳುಹಿಸಿ", "അയയ്ക്കൂ", "ส่ง", "ላክ", "傳送", "发送", "送信", "보내기" ],
                        msg_sent: [ "Your email has been scheduled", "Your message has been sent", "Pesan Anda telah dikirim", "Mesej anda telah dihantar", "El vostre missatge s’ha enviat", "Enviouse a túa mensaxe", "Vaše zpráva byla odeslána", "Meddelelsen er sendt", "Ihre Nachricht wurde gesendet", "Kiri saadeti ära", "Tu mensaje ha sido enviado", "Se ha enviado el mensaje", "Zure mezua bidali da", "Ang iyong mensahe ay naipadala", "Votre message a été envoyé", "Poruka je poslana", "Il messaggio è stato inviato", "Skeytið hefur verið sent", "Ujumbe wako umetumwa", "Ziņojums ir nosūtīts", "Jūsų laiškas išsiųstas", "Levél elküldve", "Het bericht is verzonden", "E-posten er sendt", "Wiadomość została wysłana", "Sua mensagem foi enviada", "A sua mensagem foi enviada", "Mesajul a fost trimis", "Vaša správa bola odoslaná", "Sporočilo je bilo poslano", "Viestisi on lähetetty", "Ditt meddelande har skickats", "Thư của bạn đã được gửi đi", "İletiniz gönderildi", "μήνυμά σας έχει σταλεί", "Письмо отправлено", "Порука је послата", "Повідомлення надіслано", "Съобщението ви бе изпратено", "ההודעה נשלחה", "تم إرسال رسالتك", "پیام شما فرستاده شد", "آپکا پیغام بھیجا جا چکا ہے", "आपला संदेश पाठवला गेला आहे", "आपका संदेश भेजा जा चुका है", "আপনার বার্তাটি পাঠানো হয়েছে", "તમારો સંદેશ મોકલવામાં આવ્યો છે", "உங்கள் செய்தி அனுப்பப்பட்டுவிட்டது", "మీ సందేశం పంపబడింది", "ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ರವಾನಿಸಲಾಗಿದೆ", "നിങ്ങളുടെ സന്ദേശം അയച്ചിരിക്കുന്നു", "ข้อความของคุณถูกส่งแล้ว", "መልእክትህ ተልኳል", "您的訊息已寄出", "您的邮件已发送", "メッセージを送信しました", "메일이 전송되었습니다" ],
                        saved: [ "saved", "Tersimpan", "Disimpan", "S'ha desat", "Uloženo", "Ukládání", "Gemt", "Gespeichert", "Salvestatud", "Guardado", "Guardada", "Gardado", "El mensaje se ha guardado", "Se guardó el mensaje", "Gorde da", "Na-save", "Enregistré", "Spremljeno", "Salvato", "Vistað", "Imehifadhiwa", "Saglabāts", "Išsaugota", "Mentve", "Opgeslagen", "Lagret", "Zapisano", "Salva", "Guardado", "Salvat", "Uložené", "Shranjeno", "Tallennettu", "Sparat", "Đã lưu", "Kaydedildi", "Αποθηκεύτηκε", "Сохранено", "Сачувано", "Збережено", "Запазено", "נשמר", "נשמרה", "تم الحفظ", "ذخیره شد", "محفوظ ہوگیا", "जतन केलेले", "सहेजा गया", "সংরক্ষিত", "સાચવેલા", "சேமிக்கப்பட்டது", "సేవ్ చేయబడింది", "儲存完成", "已保存", "保存しました", "저장됨" ]
                    },
                    nativeFunc: {},
                    composeHeaders: {},
                    defaultCustomTimes: [ "in 1 hour", "in 2 hours", "in 4 hours", "tomorrow afternoon", "tomorrow morning" ],
                    recurringEmailsData: {}
                }, isTestEnvironment = function() {
                    return ri.cliVersion.indexOf("test") > -1;
                }, init = function() {
                    var link, timezone;
                    postJqp($);
                    for (link in timezoneLinks) timezone = timezoneLinks[link], moment.tz.link(timezone + "|" + link);
                    return location.href.indexOf("mail.google.com/mail/b") !== -1 ? setTimeout(function() {
                        return showNotification("Notice: You can not use Right Inbox with this account. Delegated accounts are not supported.", 15);
                    }, 3e3) : location.href.indexOf("inbox.google.com") !== -1 ? getGmailUser(function(gmailUser) {
                        return jsLog.info({
                            type: "Inf366",
                            case: "inbox",
                            user: gmailUser
                        });
                    }) : disabledUserCheck(function(isDisabledUser) {
                        return isDisabledUser ? (placeDisabledUserAction(), getGmailUser(function(gmailUser) {
                            return jsLog.info({
                                type: "Inf405",
                                action: "disabledUserCheck",
                                user: gmailUser
                            });
                        })) : (handleHashChange(), detectIfConversaionViewModeEnabled(), getGmailUser(function(gmailUser) {
                            return ri.user = gmailUser, authCheck();
                        }), placeButtons(), placeRemindMeButton());
                    });
                }, window.addEventListener("message", function(event) {
                    var args, ref;
                    if (event.source === window && "rightinbox" === (null != (ref = event.data) ? ref.app : void 0) && event.data.run) return event.data.args ? (args = _u.isArray(event.data.args) ? event.data.args : [ event.data.args ], 
                    ri[event.data.run].apply(this, args)) : ri[event.data.run]();
                }, !1), overrideNativeCloseFunctions = function() {
                    var windowClose;
                    if (window.close.toString().indexOf("native code")) return windowClose = window.close, 
                    ri.nativeFunc.close = function() {
                        return windowClose.call(window);
                    }, window.close = function() {
                        if (location.search.indexOf("btop") > 0 && ($(".ri_buttonAdded").is(":visible") === !1 && "visible" !== $(".b8.UC .vh", getCanvasScope()).css("visibility") || checkForNotificationMessage("(" + ri.i18n.msg_sent.join("|") + ")"))) return ri.nativeFunc.close();
                    };
                }, postJqp = function($) {
                    return $(getCanvasScope()).delegate("#ri_undo_schedule", "click", function() {
                        return history.go(-1), $(".vh", getCanvasScope()).hide();
                    }), $.cookie.json = !0;
                }, getLocalPrefs = function(key) {
                    return ($.cookie("rightinbox") || {})[key] || "";
                }, setLocalPrefs = function(key, value, overWrite) {
                    var currentCookie, currentValue;
                    return null == overWrite && (overWrite = !1), currentCookie = $.cookie("rightinbox") || {}, 
                    null == currentCookie[key] || overWrite ? currentCookie[key] = value : _u.isArray(currentCookie[key]) ? (currentValue = currentCookie[key], 
                    currentValue.push(value), currentCookie[key] = _u.uniq(_u.flatten(currentValue))) : _u.isObject(currentCookie[key]) ? currentCookie[key] = _u.extend(currentCookie[key], key) : currentCookie[key] = value, 
                    $.cookie("rightinbox", currentCookie, {
                        expires: 365,
                        path: "/"
                    });
                }, delLocalPrefs = function(key, value) {
                    var currentCookie, currentValue, newValue;
                    return currentCookie = $.cookie("rightinbox") || {}, _u.isArray(currentCookie[key]) ? (currentValue = currentCookie[key], 
                    newValue = _u.without(currentValue, value), newValue.length > 0 ? currentCookie[key] = newValue : delete currentCookie[key]) : _u.isObject(currentCookie[key]) ? delete currentCookie[key] : delete currentCookie[key], 
                    $.cookie("rightinbox", currentCookie, {
                        expires: 365,
                        path: "/"
                    });
                }, disabledUserCheck = function(cb) {
                    return getGmailUser(function(gmailUser) {
                        return cb(indexOf.call(getLocalPrefs("disabledUsers"), gmailUser) >= 0 ? !0 : !1);
                    });
                }, randomId = function() {
                    return "ri_" + Math.round(65535 * Math.random());
                }, uuid = function() {
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                        var r, v;
                        return r = 16 * Math.random() | 0, v = "x" === c ? r : 3 & r | 8, v.toString(16);
                    });
                }, redirectToAuth = function(url) {
                    return window.location = url;
                }, disableForUser = function(gmailUser) {
                    return modelBox({
                        title: "Right Inbox is disabled for " + gmailUser,
                        message: "When you need, you may activate Right Inbox for " + gmailUser + ' by clicking "Activate Right Inbox" at the top-right of the page.<br><br>If you don\'t want to use Right Inbox at all, you can just remove the browser extension.',
                        button1: {
                            text: "Close"
                        }
                    }), setLocalPrefs("disabledUsers", [ gmailUser ]), placeDisabledUserAction(), jsLog.info({
                        type: "Inf404",
                        action: "disableForUser",
                        user: gmailUser
                    });
                }, disablePrompt = function() {
                    return 0 === $(".ri_activate_disabled_user").length ? getGmailUser(function(gmailUser) {
                        return gmailUser ? modelBox({
                            title: "Disable Right Inbox for " + gmailUser + "?",
                            message: "If you use multiple accouts at the same browser and prefer to use Right Inbox with some of your email addresses only, you may disable Right Inbox for " + gmailUser + ". ",
                            button1: {
                                text: "Disable Right Inbox for " + gmailUser,
                                color: "blue",
                                action: function() {
                                    return disableForUser(gmailUser);
                                }
                            }
                        }) : closeModelBox();
                    }) : closeModelBox();
                }, handleHashChange = function() {
                    return $(window).bind("hashchange", function(event, etc) {
                        if (location.href.match(/(#draft)/) || placeRemindMeButton(), 0 === $(".ri_slb").length && ri.interval.sentNotificationMessage) return setTimeout(function() {
                            if (0 === $(".ri_slb").length) return clearInterval(ri.interval.sentNotificationMessage), 
                            ri.interval.sentNotificationMessage = null;
                        }, 15e3);
                    }), ri.previousHash = location.hash, $(window).trigger("hashchange");
                }, sortCustomTimes = function(customTimes) {
                    var parser;
                    return parser = new DateTimeParser(), null == customTimes && (customTimes = ri.defaultCustomTimes), 
                    customTimes = _u.sortBy(customTimes, function(customTime) {
                        return parser.getMoment(customTime).valueOf() * -1;
                    });
                }, generateCustomTimeOptions = function(customTimes, action, buttonId, label) {
                    var parser, parts;
                    return parser = new DateTimeParser(), parts = [ [ "seperator" ], [ "item", "At a specific time →", function() {
                        return showDetailedDatePickerWindow(label, action, buttonId);
                    } ], [ "item", "Customize this menu →", function() {
                        return showMenuCustomizationWindow(label);
                    } ] ], _u.each(sortCustomTimes(customTimes), function(customTime) {
                        var m, tooltip;
                        return m = parser.getMoment(customTime), tooltip = (m.diff(moment(), "days") < 7 ? m.calendar() : m.format("ddd, MMM Do h:mm A")) + (" (" + m.fromNow() + ")"), 
                        parts.unshift([ "item", customTime, function() {
                            return action(m.toString(), buttonId);
                        }, tooltip ]);
                    }), parts;
                }, objectDiff = function(a, b) {
                    var r;
                    return r = {}, _u.each(a, function(v, k) {
                        if (b[k] !== v) return r[k] = _u.isObject(v) ? objectDiff(v, b[k]) : v;
                    }), r;
                }, handleUserPrefs = function(initialPreferences) {
                    var handleUserPrefsAction;
                    return ri.preferences = initialPreferences, ri.persistedPrefs = $.extend(!0, {}, ri.preferences), 
                    handleUserPrefsAction = function() {
                        var persistedPrefs;
                        return persistedPrefs = objectDiff(ri.persistedPrefs, ri.preferences), $.isEmptyObject(persistedPrefs) || '{"customTimes":{"sendLater":{},"reminder":{}}}' !== JSON.stringify(persistedPrefs) && requestXMLHttp("updateNewPreferences", ri.preferences), 
                        ri.persistedPrefs = $.extend(!0, {}, ri.preferences);
                    }, ri.interval.handleUserPrefs && clearInterval(ri.interval.handleUserPrefs), ri.interval.handleUserPrefs = setInterval(function() {
                        return handleUserPrefsAction();
                    }, 5e3);
                }, simulateKeydown = function(element) {
                    return $.browser.webkit ? dispatchKeyboardEvent(element.get(0), "keydown", !0, !0, null, "", 0, "") : $.browser.mozilla ? dispatchKeyEvent(element.get(0), "keydown", !0, !0, null, !1, !1, !1, !1, null, null) : void 0;
                }, dispatchKeyboardEvent = function(target, initKeyboradEvent_args) {
                    var e;
                    return e = document.createEvent("KeyboardEvents"), e.initKeyboardEvent.apply(e, Array.prototype.slice.call(arguments, 1)), 
                    target.dispatchEvent(e);
                }, dispatchKeyEvent = function(target, initKeyEvent_args) {
                    var e;
                    return e = document.createEvent("KeyboardEvent"), e.initKeyEvent.apply(e, Array.prototype.slice.call(arguments, 1)), 
                    target.dispatchEvent(e);
                }, simulateClick = function(element) {
                    return dispatchMouseEvent(element.get(0), "mousedown", !0, !0, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), 
                    dispatchMouseEvent(element.get(0), "mouseup", !0, !0, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 0, null);
                }, simulateMouseover = function(element) {
                    return dispatchMouseEvent(element.get(0), "mouseover", !0, !0, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 0, null);
                }, dispatchMouseEvent = function(target, initMouseEvent_args) {
                    var e;
                    return e = getCanvasScope().createEvent("MouseEvents"), e.initMouseEvent.apply(e, Array.prototype.slice.call(arguments, 1)), 
                    target.dispatchEvent(e);
                }, isInsideEmail = function() {
                    return _u.each($(".ii.gt:visible .a3s.aXjCH"), function(item) {
                        return /[0-9A-Za-z]{16}\b/.exec($(item).attr("class").split(" ")[2]);
                    }).length > 0;
                }, isSplitView = function() {
                    return $(".apk.nn").length > 0 ? "vertical" : $(".apk").length > 0 && "horizontal";
                }, detectIfConversaionViewModeEnabled = function() {
                    return $.ajax({
                        url: location.origin + location.pathname,
                        dataType: "text",
                        timeout: 3e4,
                        success: function(data, textStatus, jqXHR) {
                            return ri.conversaionViewModeEnabled = data.indexOf('["bx_vmb","1"]') === -1;
                        },
                        error: function(jqXHR, textStatus) {
                            return jsLog.error({
                                type: "Inf070",
                                statusCode: jqXHR.status,
                                textStatus: textStatus,
                                url: location.origin + location.pathname
                            });
                        }
                    });
                }, isConversaionViewModeEnabled = function() {
                    return ri.conversaionViewModeEnabled || null == ri.conversaionViewModeEnabled;
                }, whenGmailUILoaded = function(cb) {
                    var cbOnce, isLoaded, t;
                    return cbOnce = function() {
                        return "function" == typeof cb && cb(), cb = null;
                    }, isLoaded = function() {
                        return $("div[role=main]:first", getCanvasScope()).length > 0;
                    }, t = setTimeout(function() {
                        if (isLoaded()) return cbOnce();
                    }), $(document).ready(function() {
                        var attempt, i;
                        return isLoaded() ? cbOnce() : (attempt = 0, i = setInterval(function() {
                            return cb ? isLoaded() ? (clearInterval(i), cbOnce()) : ++attempt > 100 ? (clearInterval(i), 
                            cbOnce(!1)) : void 0 : clearInterval(i);
                        }, 200));
                    });
                }, isComposeWindow = function(button) {
                    return button.closest(".M9").length > 0 && 0 === button.closest(".HM").length;
                }, isReplyScreen = function(button) {
                    return button.closest(".M9").length > 0 && 0 !== button.closest(".HM").length;
                }, getParentWin = function(button) {
                    var parentWin;
                    return parentWin = button.closest(".AD,.HM"), 0 === parentWin.length && (parentWin = button.closest(".aoP,.aoC")), 
                    parentWin;
                }, extendWithComposeHeaders = function(button, data, whichHeaders) {
                    var composeHeaders, parentWin;
                    return parentWin = getParentWin(button), composeHeaders = {
                        from: whichHeaders.from ? $("textarea[name='from'],select[name='from'],input[name='from']", parentWin).val() || ri.user : void 0,
                        to: whichHeaders.to ? $("textarea[name='to'],input[name='to']", parentWin).val() : void 0,
                        cc: whichHeaders.cc ? $("textarea[name='cc'],input[name='cc']", parentWin).val() : void 0,
                        bcc: whichHeaders.bcc ? $("textarea[name='bcc'],input[name='bcc']", parentWin).val() : void 0,
                        subject: whichHeaders.subject ? $("input[name='subject']", parentWin).val() : void 0
                    }, $.extend(!0, data, whichHeaders.date ? {
                        date: new Date().toString()
                    } : void 0), $.extend(!0, data, composeHeaders), data;
                }, pleaseWait = function(message) {
                    return modelBox({
                        title: "Please Wait",
                        message: null != message ? message : "Your request is being processed.",
                        button1: {
                            enabled: !1
                        }
                    });
                }, saveCustomTimes = function(key) {
                    var hasError, parser, validCustomTimes;
                    if (parser = new DateTimeParser(), validCustomTimes = [], hasError = !1, _u.each($(".ri_customtimeinput"), function(inputDiv) {
                        var customTime, m;
                        return customTime = $("input", inputDiv).val(), m = parser.getMoment(customTime), 
                        (null != m ? m.isValid() : void 0) && m.isAfter(moment()) ? "" !== customTime ? validCustomTimes.push(customTime) : void 0 : (hasError = !0, 
                        $(".ri_customtimeinvalid", inputDiv).fadeOut("fast").fadeIn("fast"));
                    }), !hasError && (closeModelBox(), ri.preferences.customTimes[key] = validCustomTimes, 
                    showNotification("Menu saved successfully"), !_u.isEqual(ri.defaultCustomTimes.sort(), validCustomTimes.sort()))) return jsLog.goal("custom_times_modified");
                }, showMenuCustomizationWindow = function(label) {
                    var customTimeInput, insertCustomTimeInput, key, offset, parts, sampleDateTimeParserExamples, title;
                    return jsLog.goal("menu_customize_window"), "Add reminder" === label ? (title = "Reminder", 
                    key = "reminder") : (title = "Send Later", key = "sendLater"), customTimeInput = function(placeholder, customTime) {
                        return null == customTime && (customTime = ""), '<div class="ri_customtimeinput" style="line-height:2.5em"><input value="' + customTime + '" placeholder="e.g. ' + placeholder + '" class="rbx nr" style="width:287px;"><span class="Kj-JD-K7-Jq ri_removecustomtime" style="position:relative;top:10px;left:33px;padding: 0;" data-tooltip="Remove" data-tooltip-delay="600" ></span><span class="ri_customtimeinvalid" style="margin-bottom:15px;margin-left:22px;display:none;"><div class="asl T-I-J3 J-J5-Ji" style="margin-bottom: -5px;opacity:.5;"></div> Invalid Date</div></span>';
                    }, insertCustomTimeInput = function(customTime) {
                        var index;
                        return null == customTime && (customTime = ""), index = _u.random(0, dateTimeParserExamples.length - 1), 
                        $("#ri_customtimes").append(customTimeInput(dateTimeParserExamples[index], customTime)), 
                        $("#ri_customtimes").scrollTop(1e4), $(".ri_customtimeinput:last-child > input").focus(), 
                        $(".ri_removecustomtime").click(function() {
                            if ($(this).parent().remove(), 0 === $(".ri_customtimeinput").length) return insertCustomTimeInput();
                        });
                    }, parts = [], offset = _u.random(0, dateTimeParserExamples.length - 1), _u.each(sortCustomTimes(ri.preferences.customTimes[key]), function(customTime, index) {
                        return parts.unshift(customTimeInput(dateTimeParserExamples[(offset + index) % dateTimeParserExamples.length], customTime));
                    }), sampleDateTimeParserExamples = _u.sample(dateTimeParserExamples, 21), parts.unshift('<div id="ri_show_datetimeparser_examples" class="small-gray-link" style="text-align:right;width:287px;">show examples</div>'), 
                    parts.unshift('<div id="ri_datetimeparser_examples" style="margin: 15px 0;color: gray;font-size: .9em;display:none"> <div style="float:left;width: 150px;">' + sampleDateTimeParserExamples.slice(0, 7).join("<br/>") + '</div> <div style="float:left;width: 150px;">' + sampleDateTimeParserExamples.slice(7, 14).join("<br/>") + "</div> <div>" + sampleDateTimeParserExamples.slice(14).join("<br/>") + "</div> </div>"), 
                    parts.unshift('<div id="ri_customtimes" style="max-height: 320px;overflow: auto;">'), 
                    parts.push("</div>"), parts.push('<div id="" class="Kj-JD-Jl" style="margin:6px 0 48px"> <button id="ri_addcustomtime" class="J-at1-auR ri_smallbutton"> ＋ Add More </button> <button id="ri_restoredefaults" class="J-at1-auR ri_smallbutton"> Restore Default Options </button></div>'), 
                    modelBox({
                        title: "Customize " + title + " Menu",
                        message: "<div>" + parts.join("") + "</div>",
                        button2: {
                            text: "Save",
                            enabled: !0,
                            action: function() {
                                return saveCustomTimes(key);
                            }
                        },
                        button1: {
                            text: "Cancel",
                            enabled: !0
                        }
                    }), $("#ri_show_datetimeparser_examples").click(function() {
                        return $("#ri_datetimeparser_examples").is(":visible") ? ($("#ri_datetimeparser_examples").hide(), 
                        $("#ri_show_datetimeparser_examples").text("show examples")) : ($("#ri_datetimeparser_examples").show(), 
                        $("#ri_show_datetimeparser_examples").text("hide examples"));
                    }), $(".ri_removecustomtime").click(function() {
                        if ($(this).parent().remove(), 0 === $(".ri_customtimeinput").length) return insertCustomTimeInput();
                    }), $("#ri_addcustomtime").click(function() {
                        return insertCustomTimeInput();
                    }), $("#ri_restoredefaults").click(function() {
                        return $("#ri_customtimes").empty(), _u.each(ri.defaultCustomTimes, function(defaultCustomTime) {
                            return insertCustomTimeInput(defaultCustomTime);
                        });
                    });
                }, showRecurringDatePickerWindow = function(buttonLabel, action, buttonId) {
                    var button1, checkDateAndAction, data, date, displayRecurrenceDetails, errorForScheduleAction, input, l, len, m, recurringEmailId, ref, ref1, tz;
                    if (jsLog.goal("recurring_window"), errorForScheduleAction = function(text) {
                        return $("#ri_selecttimezone_invalid > span").html(text), $("#ri_selecttimezone_invalid").slideUp("fast").slideDown("fast");
                    }, checkDateAndAction = function(action, handleError, closeBox) {
                        var data, endTime, input, m;
                        if (m = moment(new Date($("#ri_selectdate").val() + " " + $("#ri_selecttime").val().replace(".", ":").replace(new RegExp(" ?([ap]m)", "i"), " $1") + ("" !== $("#ri_selecttimezone").val() ? " GMT" + $("#ri_selecttimezone").val() : ""))), 
                        "" === $("#ri_selecttime").val()) return handleError("Send time is missing");
                        if (m.isValid()) {
                            if ("date" !== $("input[name='ri_end_option']:checked").val() || moment($("#ri_select_end_date").val(), "MMMM D, YYYY", !0).isValid()) {
                                if ("date" === $("input[name='ri_end_option']:checked").val() && moment($("#ri_select_end_date").val(), "MMMM D, YYYY", !0).isBefore(moment($("#ri_selectdate").val(), "MMMM D, YYYY", !0))) return handleError("End date cannot be earlier then start date");
                                if ("occurrences" !== $("input[name='ri_end_option']:checked").val() || parseInt($("#ri_select_end_occurrences").val()) < 999 || parseInt($("#ri_select_end_occurrences").val()) > 1) {
                                    if ("weekly" === $("#ri_select_repeats").val() && 0 === $('input[name="ri_weekly_days"]:checked').length) return handleError("No weekdays selected");
                                    if ("unlimited" !== ri.monthlyQuota) return handleError('Recurring email feature is available for paid subscriptions only. Please <a id="upgrade_subscription" href="#">upgrade your subscription</a>.'), 
                                    $("#upgrade_subscription").click(ri.showPricingTable);
                                    switch ($("#ri_selecttimezone_invalid").slideUp("fast"), m = moment(new Date($("#ri_selectdate").val() + " " + $("#ri_selecttime").val().replace(".", ":").replace(new RegExp(" ?([ap]m)", "i"), " $1"))), 
                                    data = {
                                        repeats: $("#ri_select_repeats").val(),
                                        startDate: m.format("YYYY-MM-DD"),
                                        sendTime: m.format("HH:mm"),
                                        tz: $("#ri_selecttimezone").attr("data-tz") || jstz.determine().name(),
                                        tzVal: $("#ri_selecttimezone").val()
                                    }, $('input[name="ri_end_option"]:checked').val()) {
                                      case "date":
                                        data.endDate = moment(new Date($("#ri_select_end_date").val())).format("YYYY-MM-DD");
                                        break;

                                      case "occurrences":
                                        data.endOccurrences = $("#ri_select_end_occurrences").val();
                                    }
                                    switch (data.repeats) {
                                      case "daily":
                                        data.recurs = parseInt($("#ri_daily_recurs").val()), data.weekdaysOnly = $("#ri_daily_weekdays_only:checked").val() || "false";
                                        break;

                                      case "weekly":
                                        data.recurs = parseInt($("#ri_weekly_recurs").val()), data.dayOfWeek = function() {
                                            var l, len, ref, results;
                                            for (ref = $('input[name="ri_weekly_days"]:checked'), results = [], l = 0, len = ref.length; l < len; l++) input = ref[l], 
                                            results.push(parseInt($(input).val()));
                                            return results;
                                        }();
                                        break;

                                      case "monthly":
                                        "option1" === $('input[name="ri_monthly_option"]:checked').val() ? (data.dayOfMonth = parseInt($("#ri_monthly_option1_recurs1").val()), 
                                        data.recurs = parseInt($("#ri_monthly_option1_recurs2").val())) : (data.weekOfMonth = parseInt($("#ri_monthly_option2_recurs1").val()), 
                                        data.dayOfWeekInMonth = parseInt($("#ri_monthly_option2_recurs2").val()), data.recurs = parseInt($("#ri_monthly_option2_recurs3").val()));
                                        break;

                                      case "yearly":
                                        "option1" === $('input[name="ri_yearly_option"]:checked').val() ? (data.dayOfMonth = parseInt($("#ri_yearly_option1_recurs1").val()), 
                                        data.month = parseInt($("#ri_yearly_option1_recurs2").val())) : (data.weekOfMonth = parseInt($("#ri_yearly_option2_recurs1").val()), 
                                        data.dayOfWeekInMonth = parseInt($("#ri_yearly_option2_recurs2").val()), data.month = parseInt($("#ri_yearly_option2_recurs3").val()));
                                    }
                                    return "date" === $("input[name='ri_end_option']:checked").val() ? (endTime = moment(new Date($("#ri_select_end_date").val() + " " + $("#ri_selecttime").val().replace(".", ":").replace(new RegExp(" ?([ap]m)", "i"), " $1") + ("" !== $("#ri_selecttimezone").val() ? " GMT" + $("#ri_selecttimezone").val() : ""))), 
                                    new RiRecur(data).next(function(err, nextOccurrence) {
                                        return nextOccurrence > endTime ? handleError("The next possible occurence is after end date") : (closeBox && closeModelBox(), 
                                        action(data, buttonId));
                                    })) : (closeBox && closeModelBox(), action(data, buttonId));
                                }
                                return handleError("Invalid number of end occurrences");
                            }
                            return handleError("Invalid end date");
                        }
                        return handleError("Invalid start date");
                    }, date = new Date(), button1 = "Save" === buttonLabel ? {
                        text: "Cancel Recurring Email",
                        enabled: !0,
                        action: function() {
                            return cancelRecurringEmailAction(buttonId);
                        }
                    } : {
                        text: "Close",
                        enabled: !0
                    }, modelBox({
                        title: "Schedule recurring email",
                        type: "wide",
                        message: '<div class="ri_data_picker_window"> <div id="ri_selecttimezone_invalid" style="margin-bottom: 20px;display:none"><div class="asl T-I-J3 J-J5-Ji" style="margin-top: -3px;"></div> <span>Error</span></div> <div class="ri_dateinput_part2" style="margin-top:20px"> <div> <label class="el">Repeats</label><br /> <select id="ri_select_repeats" class="rbx nr" style="width:140px;"> <option value="daily">Daily</option> <option selected="selected" value="weekly">Weekly</option> <option value="monthly">Monthly</option> <option value="yearly">Yearly</option> </select> </div> <div style="padding:0"> <div id="ri_daily_details" class="ri_recurring_details"> <div> <label class="el">Recurs</label><br /> <select id="ri_daily_recurs" class="rbx nr" style="width:140px;"> <option value="1">Every day</option> <option value="2">Every 2 days</option> <option value="3">Every 3 days</option> <option value="4">Every 4 days</option> <option value="5">Every 5 days</option> <option value="6">Every 6 days</option> </select> </div> <div> <br /> <label style="line-height: 1.6em;"><input type="checkbox" id="ri_daily_weekdays_only" value="true"> Weekdays only</label> </div> </div> <div id="ri_weekly_details" class="ri_recurring_details"> <div> <label class="el">Recurs</label><br /> <select id="ri_weekly_recurs" class="rbx nr" style="width:140px;"> <option value="1">Every week</option> <option value="2">Every 2 weeks</option> <option value="3">Every 3 weeks</option> <option value="4">Every 4 weeks</option> <option value="5">Every 5 weeks</option> <option value="6">Every 6 weeks</option> </select> </div> <div style="width:105px;"> <br /> <label><input type="checkbox" checked="checked" name="ri_weekly_days" value="1"> on Monday</label><br /> <label><input type="checkbox" checked="checked" name="ri_weekly_days" value="2"> on Tuesday</label><br /> <label><input type="checkbox" checked="checked" name="ri_weekly_days" value="3"> on Wednesday</label><br /> </div> <div style="width:90px;"> <br /> <label><input type="checkbox" checked="checked" name="ri_weekly_days" value="4"> on Thursday</label><br /> <label><input type="checkbox" checked="checked" name="ri_weekly_days" value="5"> on Friday</label><br /> </div> <div style="width:90px;"> <br /> <label><input type="checkbox" name="ri_weekly_days" value="6"> on Saturday</label><br /> <label><input type="checkbox" name="ri_weekly_days" value="0"> on Sunday</label><br /> </div> </div> <div id="ri_monthly_details" class="ri_recurring_details"> <div> <label class="el">Recurs</label><br /> <input type="radio" checked="checked" name="ri_monthly_option" id="ri_monthly_option1" value="option1"> <select id="ri_monthly_option1_recurs1" class="rbx nr" style="width:125px;"> <option value="1">On the 1st day</option> <option value="2">On the 2nd day</option> <option value="3">On the 3rd day</option> <option value="4">On the 4th day</option> <option value="5">On the 5th day</option> <option value="6">On the 6th day</option> <option value="7">On the 7th day</option> <option value="8">On the 8th day</option> <option value="9">On the 9th day</option> <option value="10">On the 10th day</option> <option value="11">On the 11th day</option> <option value="12">On the 12th day</option> <option value="13">On the 13th day</option> <option value="14">On the 14th day</option> <option value="15">On the 15th day</option> <option value="16">On the 16th day</option> <option value="17">On the 17th day</option> <option value="18">On the 18th day</option> <option value="19">On the 19th day</option> <option value="20">On the 20th day</option> <option value="21">On the 21st day</option> <option value="22">On the 22nd day</option> <option value="23">On the 23rd day</option> <option value="24">On the 24th day</option> <option value="25">On the 25th day</option> <option value="26">On the 26th day</option> <option value="27">On the 27th day</option> <option value="28">On the 28th day</option> <option value="29">On the 29th day</option> <option value="30">On the 30th day</option> <option value="31">On the 31st day</option> <option value="-1">On the last day</option> </select> </div> <div> <br /> <select id="ri_monthly_option1_recurs2" class="rbx nr" style="width:150px;"> <option value="1">of every month</option> <option value="2">of every 2 months</option> <option value="3">of every 3 months</option> <option value="4">of every 4 months</option> <option value="5">of every 5 months</option> <option value="6">of every 6 months</option> </select> </div> <div class="ri_cb"></div> <div> <input type="radio" name="ri_monthly_option" id="ri_monthly_option2" value="option2"> <select id="ri_monthly_option2_recurs1" class="rbx nr" style="width:125px;"> <option value="1">On the first</option> <option value="2">On the second</option> <option value="3">On the third</option> <option value="4">On the fourth</option> <option value="-1">On the last</option> </select> </div> <div> <select id="ri_monthly_option2_recurs2" class="rbx nr" style="width:150px;"> <option value="1">Monday</option> <option value="2">Tuesday</option> <option value="3">Wednesday</option> <option value="4">Thursday</option> <option value="5">Friday</option> <option value="6">Saturday</option> <option value="0">Sunday</option> </select> </div> <div> <select id="ri_monthly_option2_recurs3" class="rbx nr" style="width:140px;"> <option value="1">of every month</option> <option value="2">of every 2 months</option> <option value="3">of every 3 months</option> <option value="4">of every 4 months</option> <option value="5">of every 5 months</option> <option value="6">of every 6 months</option> </select> </div> </div> <div id="ri_yearly_details" class="ri_recurring_details"> <div> <label class="el">Recurs</label><br /> <input type="radio" checked="checked" id="ri_yearly_option1" name="ri_yearly_option" value="option1"> <select id="ri_yearly_option1_recurs1" class="rbx nr" style="width:125px;"> <option value="1">On the 1st day</option> <option value="2">On the 2nd day</option> <option value="3">On the 3rd day</option> <option value="4">On the 4th day</option> <option value="5">On the 5th day</option> <option value="6">On the 6th day</option> <option value="7">On the 7th day</option> <option value="8">On the 8th day</option> <option value="9">On the 9th day</option> <option value="10">On the 10th day</option> <option value="11">On the 11th day</option> <option value="12">On the 12th day</option> <option value="13">On the 13th day</option> <option value="14">On the 14th day</option> <option value="15">On the 15th day</option> <option value="16">On the 16th day</option> <option value="17">On the 17th day</option> <option value="18">On the 18th day</option> <option value="19">On the 19th day</option> <option value="20">On the 20th day</option> <option value="21">On the 21st day</option> <option value="22">On the 22nd day</option> <option value="23">On the 23rd day</option> <option value="24">On the 24th day</option> <option value="25">On the 25th day</option> <option value="26">On the 26th day</option> <option value="27">On the 27th day</option> <option value="28">On the 28th day</option> <option value="29">On the 29th day</option> <option value="30">On the 30th day</option> <option value="31">On the 31st day</option> <option value="-1">On the last day</option> </select> </div> <div> <br /> <select id="ri_yearly_option1_recurs2" class="rbx nr" style="width:150px;"> <option value="0">of every January</option> <option value="1">of every February</option> <option value="2">of every March</option> <option value="3">of every April</option> <option value="4">of every May</option> <option value="5">of every June</option> <option value="6">of every July</option> <option value="7">of every August</option> <option value="8">of every September</option> <option value="9">of every October</option> <option value="10">of every November</option> <option value="11">of every December</option> </select> </div> <div class="ri_cb"></div> <div> <input type="radio" id="ri_yearly_option2" name="ri_yearly_option" value="option2"> <select id="ri_yearly_option2_recurs1" class="rbx nr" style="width:125px;"> <option value="1">On the first</option> <option value="2">On the second</option> <option value="3">On the third</option> <option value="4">On the fourth</option> <option value="-1">On the last</option> </select> </div> <div> <select id="ri_yearly_option2_recurs2" class="rbx nr" style="width:150px;"> <option value="1">Monday</option> <option value="2">Tuesday</option> <option value="3">Wednesday</option> <option value="4">Thursday</option> <option value="5">Friday</option> <option value="6">Saturday</option> <option value="0">Sunday</option> </select> </div> <div> <select id="ri_yearly_option2_recurs3" class="rbx nr" style="width:150px;"> <option value="0">of every January</option> <option value="1">of every February</option> <option value="2">of every March</option> <option value="3">of every April</option> <option value="4">of every May</option> <option value="5">of every June</option> <option value="6">of every July</option> <option value="7">of every August</option> <option value="8">of every September</option> <option value="9">of every October</option> <option value="10">of every November</option> <option value="11">of every December</option> </select> </div> </div> </div> </div> <div class="ri_cb"></div> <div class="ri_dateinput_part2" style="height: 41px;margin-top:22px;"> <div><label for="ri_selecttime" class="el">Send time</label><br /><input type="text" id="ri_selecttime" class="rbx nr" style="width:140px"></div> <div><label for="ri_selecttimezone" class="el">Timezone (optional)</label><br /><input type="text" id="ri_selecttimezone" class="rbx nr" style="width:150px"></div> </div> <div style="clear:both;"></div> <div class="ri_dateinput_part3" style="height:115px;margin-top:22px;"> <div><label for="ri_selectdate" class="el">Start date</label><br /><input type="text" id="ri_selectdate" class="rbx nr" style="width:140px" value="' + (ri.monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()) + '"></div> <div> <label for="ri_select_end_date" class="el">Ends</label><br /> <div style="float:left;"><input type="radio" name="ri_end_option" id="ri_end_option1" value="date"> </div><div style="float:left;width:30px;padding:2px 5px">On</div> <input type="text" id="ri_select_end_date" class="rbx nr" style="width:140px"> <div style="float:left;clear:both"><input type="radio" name="ri_end_option" id="ri_end_option2" value="occurrences"> </div><div style="float:left;width:30px;padding:2px 5px">After</div> <input type="text" id="ri_select_end_occurrences" class="rbx nr ri_thin_input"> occurrences<br /> <label><input type="radio" checked="checked" name="ri_end_option" id="ri_end_option3" value="false"> No end date</label> </div> <div id="ri_dateoutput" style="float:left;width: 270px;padding-top: 18px;font-size:1em;line-height: 1.2em;color: green;"></div> </div>',
                        button2: {
                            text: buttonLabel,
                            enabled: !0,
                            action: function() {
                                return checkDateAndAction(action, errorForScheduleAction, !0);
                            }
                        },
                        button1: button1
                    }), $("#ri_selectdate").glDatePicker({
                        allowOld: !1,
                        startDate: new Date(),
                        onChange: function(input, date) {
                            return input.val(ri.monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()), 
                            input.keyup();
                        }
                    }), $("#ri_select_end_date").glDatePicker({
                        allowOld: !1,
                        startDate: new Date(),
                        onChange: function(input, date) {
                            return input.val(ri.monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()), 
                            input.keyup(), $("#ri_select_end_occurrences").val(""), $("#ri_end_option1").attr("checked", !0);
                        }
                    }), $(".time-picker").remove(), $("#ri_selecttime").timePicker({
                        matchRegex: new RegExp("[012]?[0-9]:[0-9]{2} [AP]M"),
                        show24Hours: !1,
                        step: 30,
                        defaultValue: moment().add(30 - moment().minutes() % 30, "minutes").format("h:mm A")
                    }).mask("09:00 AM", {
                        clearIfNotMatch: !0,
                        translation: {
                            ":": {
                                pattern: /[:.]/
                            },
                            " ": {
                                pattern: /[ ]/,
                                optional: !0
                            },
                            A: {
                                pattern: /([APap])/,
                                optional: !0
                            },
                            M: {
                                pattern: /[Mm]/,
                                optional: !0
                            }
                        }
                    }), $('.time-picker li span:contains("AM")').css("color", "rgb(95, 141, 172)"), 
                    $("#ri_selecttimezone").timePicker({
                        matchRegex: new RegExp("[+-][0-9]{2}:[0-9]{2}"),
                        defaultValue: moment().format("Z")
                    }).mask("~00:00", {
                        clearIfNotMatch: !0,
                        translation: {
                            "~": {
                                pattern: /[+-]/
                            }
                        }
                    }), $($(".time-picker ul")[1]).html(function() {
                        var l, len, ref, results;
                        for (ref = ri.timeZones, results = [], l = 0, len = ref.length; l < len; l++) tz = ref[l], 
                        results.push("<li data-tz='" + tz[0] + "' class>(GMT" + moment().tz(tz[0]).format("Z") + ") " + tz[1] + "</li>");
                        return results;
                    }().join("")), $("#ri_selecttimezone").keyup(function() {
                        return $("#ri_selecttimezone").attr("data-tz", null);
                    }), $(".ri_dateinput_part2 > div > input").keyup(function() {
                        return $("#ri_entercustomdate").val(""), $("#ri_dateoutput").html("");
                    }), $(".ri_dateinput_part2 > div > input").change(function() {
                        return $("#ri_entercustomdate").val(""), $("#ri_dateoutput").html("");
                    }), $("#ri_select_repeats").change(function() {
                        return $(".ri_recurring_details").hide(), $("#ri_" + $("#ri_select_repeats").val() + "_details").show();
                    }), displayRecurrenceDetails = function() {
                        return checkDateAndAction(function(data) {
                            return new RiRecur(data).next(function(err, nextOccurrence) {
                                return $("#ri_dateoutput").html("Next occurrence will be on <strong>" + moment(nextOccurrence.toDate()).format("ddd, MMM Do [at] h:mm A Z") + "</strong> (local time) in about " + nextOccurrence.fromNow(!0));
                            });
                        }, function() {
                            return $("#ri_dateoutput").html("");
                        });
                    }, $('.ri_data_picker_window input[type="text"]').change(_u.throttle(displayRecurrenceDetails, 1e3)), 
                    $('.ri_data_picker_window input[type="text"]').keyup(_u.throttle(displayRecurrenceDetails, 1e3)), 
                    $('.ri_data_picker_window input[type!="text"]').click(_u.throttle(displayRecurrenceDetails, 1e3)), 
                    $(".ri_data_picker_window select").change(_u.throttle(displayRecurrenceDetails, 1e3)), 
                    "Save" === buttonLabel) {
                        switch (recurringEmailId = getRecurringEmailId(getRecurringButton(buttonId)), data = ri.recurringEmailsData[recurringEmailId], 
                        m = moment(data.startDate + data.sendTime, "YYYY-MM-DDHH:mm"), $("#ri_select_repeats").val(data.repeats), 
                        $("#ri_selectdate").val(m.format("MMMM D, YYYY")), $("#ri_selecttime").val(m.format("h:mm A")), 
                        data.tzVal && $("#ri_selecttimezone").val(data.tzVal), data.tz && $("#ri_selecttimezone").attr("data-tz", data.tz), 
                        data.endOccurrences && ($("#ri_select_end_occurrences").val(data.endOccurrences), 
                        $("#ri_end_option2").attr("checked", !0)), data.endDate && ($("#ri_select_end_date").val(moment(data.endDate).format("MMMM D, YYYY")), 
                        $("#ri_end_option1").attr("checked", !0)), $("#ri_" + data.repeats + "_details").show(), 
                        data.repeats) {
                          case "daily":
                            $("#ri_daily_recurs").val(data.recurs), $("#ri_daily_weekdays_only").attr("checked", "true" === data.weekdaysOnly);
                            break;

                          case "weekly":
                            for ($("#ri_weekly_recurs").val(data.recurs), ref = $('input[name="ri_weekly_days"]'), 
                            l = 0, len = ref.length; l < len; l++) input = ref[l], ref1 = parseInt($(input).val()), 
                            indexOf.call(data.dayOfWeek, ref1) >= 0 ? $(input).attr("checked", !0) : $(input).attr("checked", !1);
                            break;

                          case "monthly":
                            data.dayOfMonth ? ($("#ri_monthly_option1_recurs1").val(data.dayOfMonth), $("#ri_monthly_option1_recurs2").val(data.recurs), 
                            $("#ri_monthly_option1").attr("checked", !0)) : ($("#ri_monthly_option2_recurs1").val(data.weekOfMonth), 
                            $("#ri_monthly_option2_recurs2").val(data.dayOfWeekInMonth), $("#ri_monthly_option2_recurs3").val(data.recurs), 
                            $("#ri_monthly_option2").attr("checked", !0));
                            break;

                          case "yearly":
                            data.dayOfMonth ? ($("#ri_yearly_option1_recurs1").val(data.dayOfMonth), $("#ri_yearly_option1_recurs2").val(data.month)) : ($("#ri_yearly_option2_recurs1").val(data.weekOfMonth), 
                            $("#ri_yearly_option2_recurs2").val(data.dayOfWeekInMonth), $("#ri_yearly_option2_recurs3").val(data.month));
                        }
                        displayRecurrenceDetails();
                    } else $("#ri_weekly_details").show();
                    if ($("#ri_monthly_option1_recurs1,#ri_monthly_option1_recurs2").focus(function() {
                        return $("#ri_monthly_option1").attr("checked", !0);
                    }), $("#ri_monthly_option2_recurs1,#ri_monthly_option2_recurs2,#ri_monthly_option2_recurs3").focus(function() {
                        return $("#ri_monthly_option2").attr("checked", !0);
                    }), $("#ri_yearly_option1_recurs1,#ri_yearly_option1_recurs2").focus(function() {
                        return $("#ri_yearly_option1").attr("checked", !0);
                    }), $("#ri_yearly_option2_recurs1,#ri_yearly_option2_recurs2,#ri_yearly_option2_recurs3").focus(function() {
                        return $("#ri_yearly_option2").attr("checked", !0);
                    }), $("#ri_select_end_occurrences").focus(function() {
                        return $("#ri_end_option2").attr("checked", !0), $("#ri_select_end_date").val("");
                    }), $("#ri_end_option2").click(function() {
                        return $("#ri_select_end_date").val(""), $("#ri_select_end_occurrences").focus();
                    }), $("#ri_end_option1").click(function() {
                        return $("#ri_select_end_occurrences").val(""), setTimeout(function() {
                            return $("#ri_select_end_date").focus();
                        }, 50);
                    }), "unlimited" !== ri.monthlyQuota) return errorForScheduleAction('Recurring email feature is available for paid subscriptions only. Please <a id="upgrade_subscription" href="#">upgrade your subscription</a>.'), 
                    $("#upgrade_subscription").click(ri.showPricingTable);
                }, showDetailedDatePickerWindow = function(buttonLabel, action, buttonId) {
                    var button1, checkDateAndAction, m, parser, placeholderExample, sampleDateTimeParserExamples, scheduledEmailDetails, tz;
                    switch (buttonLabel) {
                      case "Schedule":
                        jsLog.goal("schedule_specific_window");
                        break;

                      case "Add reminder":
                        jsLog.goal("reminder_specific_window");
                    }
                    if (checkDateAndAction = function(action) {
                        var m, parser, selectDateStr;
                        if ("" !== $("#ri_selectdate").val()) selectDateStr = $("#ri_selectdate").val() + " " + $("#ri_selecttime").val().replace(".", ":").replace(new RegExp(" ?([ap]m)", "i"), " $1") + ("" !== $("#ri_selecttimezone").val() ? " GMT" + $("#ri_selecttimezone").val() : ""), 
                        m = moment(new Date(selectDateStr)), m.isValid() || jsLog.warn({
                            type: "Err084",
                            option: "datepicker",
                            value: selectDateStr
                        }); else if ("" !== $("#ri_entercustomdate").val()) {
                            switch (buttonLabel) {
                              case "Schedule":
                                jsLog.goal("schedule_specific_typed");
                                break;

                              case "Add reminder":
                                jsLog.goal("reminder_specific_typed");
                            }
                            parser = new DateTimeParser(), m = parser.getMoment($("#ri_entercustomdate").val()), 
                            m ? jsLog.info({
                                type: "Inf084",
                                option: "moment",
                                value: $("#ri_entercustomdate").val()
                            }) : jsLog.warn({
                                type: "Err084",
                                option: "moment",
                                value: $("#ri_entercustomdate").val()
                            });
                        }
                        return (null != m ? m.isValid() : void 0) && m.isAfter(moment()) ? (closeModelBox(), 
                        action(m.toDate(), buttonId)) : $("#ri_selecttimezone_invalid").slideUp("fast").slideDown("fast");
                    }, placeholderExample = _u.sample(dateTimeParserExamples), sampleDateTimeParserExamples = _u.sample(dateTimeParserExamples, 21), 
                    button1 = "Save" === buttonLabel ? {
                        text: "Cancel Scheduled Email",
                        enabled: !0,
                        action: function() {
                            return cancelScheduledEmail(buttonId);
                        }
                    } : {
                        text: "Close",
                        enabled: !0
                    }, modelBox({
                        title: "Choose a specific date & time",
                        message: '<div id="ri_selecttimezone_invalid" style="margin-bottom: 15px;display:none"><div class="asl T-I-J3 J-J5-Ji" style="margin-bottom: -5px;"></div> Invalid Date</div> <div class="ri_dateinput_part1" style="height: 41px;"> <div style="float:left;padding-right:10px"><label for="ri_selectdate" class="el">Select date</label><br /><input id="ri_selectdate" class="rbx nr"></div> <div style="float:left;padding-right:10px"><label for="ri_selecttime" class="el">time</label><br /><input id="ri_selecttime" class="rbx nr" style="width:120px"></div> <div style="float:left"><label for="ri_selecttimezone" class="el">timezone (optional)</label><br /><input id="ri_selecttimezone" class="rbx nr" style="width:120px"></div> </div> <div style="clear:both;padding-top: 30px;text-align: center;font-style: italic;border-bottom: 1px solid #ddd;margin-bottom: 30px;margin-right: 40px;"></div> <div class="ri_dateinput_part2" style="height: 80px;"> <div style="text-align: center;margin-top: -39px;background-color: white;width: 40px;margin-left: 200px;margin-bottom: 10px;">OR</div> <div id="ri_datetimeparser_examples" style="margin: 15px 0;color: gray;font-size: .9em;display:none"> <div style="float:left;width: 160px;">' + sampleDateTimeParserExamples.slice(0, 7).join("<br/>") + '</div> <div style="float:left;width: 160px;">' + sampleDateTimeParserExamples.slice(7, 14).join("<br/>") + "</div> <div>" + sampleDateTimeParserExamples.slice(14).join("<br/>") + '</div> </div> <div style="float:left;padding-right:10px"><label for="ri_entercustomdate" class="el" style="float:left">Type date & time or duration</label><div id="ri_show_datetimeparser_examples" class="small-gray-link" style="text-align:right;margin-bottom:-16px;">show examples</div><br /><input id="ri_entercustomdate" placeholder="e.g. ' + placeholderExample + '" class="rbx nr" style="width:287px"></div> <div id="ri_dateoutput" style="float:left;width: 160px;padding-top: 18px;font-size: .85em;line-height: 1.2em;color: green;"></div> </div> <div style="clear:both;"></div>',
                        button2: {
                            text: buttonLabel,
                            enabled: !0,
                            action: function() {
                                return checkDateAndAction(action);
                            }
                        },
                        button1: button1
                    }), $("#ri_show_datetimeparser_examples").click(function() {
                        return $("#ri_datetimeparser_examples").is(":visible") ? ($("#ri_datetimeparser_examples").hide(), 
                        $("#ri_show_datetimeparser_examples").text("show examples")) : ($("#ri_datetimeparser_examples").show(), 
                        $("#ri_show_datetimeparser_examples").text("hide examples"));
                    }), $("#ri_selectdate").glDatePicker({
                        allowOld: !1,
                        startDate: new Date(),
                        onChange: function(input, date) {
                            return input.val(ri.monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear());
                        }
                    }), $(".time-picker").remove(), $("#ri_selecttime").timePicker({
                        matchRegex: new RegExp("[012]?[0-9]:[0-9]{2} [AP]M"),
                        show24Hours: !1,
                        step: 30,
                        defaultValue: moment().add(30 - moment().minutes() % 30, "minutes").format("h:mm A")
                    }).mask("09:00 AM", {
                        clearIfNotMatch: !0,
                        translation: {
                            ":": {
                                pattern: /[:.]/
                            },
                            " ": {
                                pattern: /[ ]/,
                                optional: !0
                            },
                            A: {
                                pattern: /([APap])/,
                                optional: !0
                            },
                            M: {
                                pattern: /[Mm]/,
                                optional: !0
                            }
                        }
                    }), $('.time-picker li span:contains("AM")').css("color", "rgb(95, 141, 172)"), 
                    $("#ri_selecttimezone").timePicker({
                        matchRegex: new RegExp("[+-][0-9]{2}:[0-9]{2}"),
                        defaultValue: moment().format("Z")
                    }).mask("~00:00", {
                        clearIfNotMatch: !0,
                        translation: {
                            "~": {
                                pattern: /[+-]/
                            }
                        }
                    }), $($(".time-picker ul")[1]).html(function() {
                        var l, len, ref, results;
                        for (ref = ri.timeZones, results = [], l = 0, len = ref.length; l < len; l++) tz = ref[l], 
                        results.push("<li class>(GMT" + moment().tz(tz[0]).format("Z") + ") " + tz[1] + "</li>");
                        return results;
                    }().join("")), $(".ri_dateinput_part1 > div > input").keyup(function() {
                        return $("#ri_entercustomdate").val(""), $("#ri_dateoutput").html("");
                    }), $(".ri_dateinput_part1 > div > input").change(function() {
                        return $("#ri_entercustomdate").val(""), $("#ri_dateoutput").html("");
                    }), parser = new DateTimeParser(), $("#ri_entercustomdate").keyup(function() {
                        return ri.timeout.customDateKeyup && clearTimeout(ri.timeout.customDateKeyup), ri.timeout.customDateKeyup = setTimeout(function() {
                            var moment;
                            return $(".ri_dateinput_part1 > div > input").val(""), moment = parser.getMoment($("#ri_entercustomdate").val()), 
                            moment ? $("#ri_dateoutput").html(moment.format("ddd, MMM Do h:mm A") + "<br />(local time)").attr("data-tooltip", moment.fromNow()).attr("data-tooltip-delay", "600") : $("#ri_dateoutput").html("");
                        }, 200);
                    }), setTimeout(function() {
                        return $("#ri_entercustomdate").focus();
                    }, 500), "Save" === buttonLabel) return scheduledEmailDetails = getScheduledEmailDetails(getSendLaterButton(buttonId)), 
                    m = moment(scheduledEmailDetails), $("#ri_selectdate").val(m.format("MMMM D, YYYY")), 
                    $("#ri_selecttime").val(m.format("h:mm A"));
                }, String.prototype.capitalize = function() {
                    return this.charAt(0).toUpperCase() + this.slice(1);
                }, getRecurringButton = function(buttonId) {
                    return $("#recurring_" + buttonId, getCanvasScope());
                }, getRecurringPrefButton = function(buttonId) {
                    return $("#recurring_pref_" + buttonId, getCanvasScope());
                }, getReminderButton = function(buttonId) {
                    return $("#reminder_" + buttonId, getCanvasScope());
                }, getReminderPrefButton = function(buttonId) {
                    return $("#reminder_pref_" + buttonId, getCanvasScope());
                }, getSendLaterButton = function(buttonId) {
                    return $("#send_later_" + buttonId, getCanvasScope());
                }, getSendLaterPrefButton = function(buttonId) {
                    return $("#send_later_pref_" + buttonId, getCanvasScope());
                }, getAddNoteButton = function(buttonId) {
                    return $("#add_note_" + buttonId, getCanvasScope());
                }, getAddNotePrefButton = function(buttonId) {
                    return $("#add_note_pref_" + buttonId, getCanvasScope());
                }, getElementValues = function(elements, separator) {
                    var output, outputShortened, values;
                    if (values = [], elements.map(function(index, item) {
                        return values.push($(item).val());
                    }), values.length > 0) return separator ? (output = values.join(separator), output.length > 1024 ? (outputShortened = output.substr(0, 768), 
                    outputShortened + Array(values.length - outputShortened.match(/,/g).length).join(",")) : output) : values;
                }, getEditable = function(parentWin) {
                    return 1 === $(".aVN").length ? $(".editable", getCanvasScope()) : $(".editable", parentWin);
                }, clearReplacementBoxId = function(parentWin) {
                    return $("input[name='replacementBox']", parentWin).attr("id", null);
                }, updateSubject = function(newSubject, oldSubject, button, callback) {
                    var i, j, k, parentWin;
                    return clearReplacementBoxId(parentWin), parentWin = getParentWin(button), isComposeWindow(button) ? (i = setInterval(function() {
                        if (ri.i18nCheck("saved", $(".oG:last", parentWin).text())) return clearInterval(i), 
                        callback();
                    }, 200), setTimeout(function() {
                        return clearInterval(i);
                    }, 1e4)) : (j = setInterval(function() {
                        if (ri.i18nCheck("saved", $(".oG:last", parentWin).text())) return clearInterval(j), 
                        callback();
                    }, 200), setTimeout(function() {
                        return clearInterval(j);
                    }, 1e4)), $("input[name='subject']", parentWin).val(newSubject), $("input[name='subjectbox']", parentWin).val(newSubject), 
                    isSplitView() && (k = setInterval(function() {
                        if ($("input[name='subject']", parentWin).val() === oldSubject) return $("input[name='subject']", parentWin).val(newSubject), 
                        $("input[name='subjectbox']", parentWin).val(newSubject), clearInterval(k);
                    }, 100), setTimeout(function() {
                        return clearInterval(k);
                    }, 1e4)), simulateKeydown(getEditable(getParentWin(button)));
                }, updateNoteThreadId = function(arg) {
                    var newThreadId, oldThreadId, subject;
                    if (oldThreadId = arg.oldThreadId, newThreadId = arg.newThreadId, subject = arg.subject, 
                    oldThreadId !== newThreadId) return requestXMLHttp("updateNoteThreadId", {
                        oldThreadId: oldThreadId,
                        newThreadId: newThreadId,
                        subject: subject
                    }, function(err, result) {
                        if (!err) return ri.notedThreads[newThreadId || result.newThreadId] = ri.notedThreads[oldThreadId], 
                        delete ri.notedThreads[oldThreadId];
                    });
                }, enableAddNoteButtonForThreadId = function(threadId, buttonId, cb) {
                    var ref, ref1, ref2;
                    return null == cb && (cb = function() {}), threadId && ri.notedThreads && null == (null != (ref = ri.notedThreads) ? ref[threadId] : void 0) && !(null != (ref1 = ri.notedThreads) ? ref1.localcache : void 0) ? requestXMLHttp("checkNote", {
                        threadId: threadId
                    }, function(err, result) {
                        var ref2;
                        return err ? cb(!1) : (null != result ? result.noted : void 0) === !0 ? (ri.notedThreads[threadId] = {
                            text: result.text
                        }, enableAddNoteButton(buttonId, result.text), ri.preferences.openNote ? toggleAddNote(buttonId) : showTooltip(getAddNoteButton(buttonId)), 
                        cb(!0)) : (null != (ref2 = ri.notedThreads) && (ref2[threadId] = !1), disableAddNoteButton(buttonId), 
                        cb(!1));
                    }) : (null != (ref2 = ri.notedThreads) ? ref2[threadId] : void 0) ? (enableAddNoteButton(buttonId, ri.notedThreads[threadId].text), 
                    ri.preferences.openNote ? toggleAddNote(buttonId) : showTooltip(getAddNoteButton(buttonId)), 
                    cb(!0)) : (disableAddNoteButton(buttonId), cb(!1));
                }, addNotePrefs = function(buttonId) {
                    var parts;
                    return jsLog.goal("add_note_prefs_open"), parts = [ [ "checkbox", "Label as <span class='ri_gray_label'>Note</span>", "labelNote" ], [ "checkbox", "Display the note automatically", "openNote", "If checked, the note window is displayed automatically when a conversaion with a note is opened" ] ], 
                    uiMenu({
                        id: "ri_etp",
                        parts: parts,
                        clickOutButton: getAddNotePrefButton(buttonId)
                    });
                }, addNote = function(addNoteButton) {
                    var buttonId;
                    if (ri.addNoteData[addNoteButton.selector]) return buttonId = addNoteButton.attr("id").match(/ri_\d+/)[0], 
                    $.extend(!0, ri.addNoteData[addNoteButton.selector], {
                        labelNote: ri.preferences.labelNote
                    }), ri.addNoteData[addNoteButton.selector] = extendWithComposeHeaders(addNoteButton, ri.addNoteData[addNoteButton.selector], {
                        subject: "subject"
                    }), showNotification("Saving note...", 30), requestXMLHttp("addNote", ri.addNoteData[addNoteButton.selector], function(err, result) {
                        var handleAddedNotes, ref, threadId;
                        return (null != result ? result.added : void 0) !== !0 ? (hideNotification(), disableAddNoteButton(buttonId), 
                        toggleAddNote(buttonId, !0), delete ri.addNoteData[addNoteButton.selector], modelBox({
                            title: "Right Inbox Error (Err: 068)",
                            message: "Cannot save the note at the moment. Please try again later.<br /> If you have any questions please <a href='mailto:support@rightinbox.com?subject=About Err 068&body=Hi, I have come across Error 068 while using Right Inbox. Please have a look.'>let us know</a>",
                            button1: {
                                text: "Close",
                                color: "white",
                                focused: !0
                            }
                        }), jsLog.error({
                            type: "Err068"
                        })) : (showFinishedNotification("note saved", 5), ri.showPromotion(), refreshInbox(), 
                        showTooltip(addNoteButton), handleAddedNotes = function(threadId) {
                            return ri.notedThreads[threadId] = ri.addNoteData[addNoteButton.selector], delete ri.addNoteData[addNoteButton.selector], 
                            enableAddNoteButton(buttonId);
                        }, (threadId = (null != (ref = ri.addNoteData[addNoteButton.selector]) ? ref.threadId : void 0) || result.threadId) ? handleAddedNotes(threadId) : void 0);
                    });
                }, disableAddNoteButton = function(buttonId, disableOtherButton) {
                    var addNoteButton, otherButton, reminderPrefButton, threadId;
                    if (null == disableOtherButton && (disableOtherButton = !0), addNoteButton = getAddNoteButton(buttonId), 
                    reminderPrefButton = getAddNotePrefButton(buttonId), addNoteButton.add(reminderPrefButton).addClass("T-I-ax7").removeClass("T-I-RIy"), 
                    addNoteButton.add(reminderPrefButton).find(".T-Jo-Jp").addClass("T-Jo-iAfbIe").removeClass("T-Jo-Jp").removeClass("T-Jo-RI"), 
                    addNoteButton.add(reminderPrefButton).attr("data-tooltip", ""), addNoteButton.find(">.ri-label").html("Add Note"), 
                    disableOtherButton && !isComposeWindow(addNoteButton) && (threadId = addNoteButton.attr("data-threadid"), 
                    threadId && (otherButton = $("[role='button'][data-threadid='" + threadId + "']", getCanvasScope()).filter(function() {
                        return 0 !== $(this).attr("id").indexOf("add_note") && $(this).attr("id").match(/ri_\d+/)[0] !== buttonId;
                    }), otherButton.length > 0))) return disableAddNoteButton(otherButton.attr("id").match(/ri_\d+/)[0], !1);
                }, enableAddNoteButton = function(buttonId, text, enableOtherButton) {
                    var addNoteButton, addNotePrefButton, otherButton, threadId;
                    if (null == enableOtherButton && (enableOtherButton = !0), addNoteButton = getAddNoteButton(buttonId), 
                    addNotePrefButton = getAddNotePrefButton(buttonId), addNoteButton.add(addNotePrefButton).removeClass("T-I-ax7").addClass("T-I-RIy"), 
                    addNoteButton.add(addNotePrefButton).find(".T-Jo-iAfbIe").removeClass("T-Jo-iAfbIe").addClass("T-Jo-Jp").addClass("T-Jo-RI"), 
                    addNoteButton.attr("data-tooltip", text), addNoteButton.attr("data-tooltip-delay", "0"), 
                    addNoteButton.find(">.ri-label").html("View Note"), enableOtherButton && !isComposeWindow(addNoteButton) && (threadId = addNoteButton.attr("data-threadid"), 
                    threadId && (otherButton = $("[role='button'][data-threadid='" + threadId + "']", getCanvasScope()).filter(function() {
                        return 0 !== $(this).attr("id").indexOf("add_note") && $(this).attr("id").match(/ri_\d+/)[0] !== buttonId;
                    }), otherButton.length > 0))) return enableAddNoteButton(otherButton.attr("id").match(/ri_\d+/)[0], text, !1);
                }, deleteNote = function(threadId, buttonId) {
                    var addNoteButton;
                    return jsLog.goal("delete_note"), showNotification("Deleting note...", 30), addNoteButton = getAddNoteButton(buttonId), 
                    requestXMLHttp("deleteNote", {
                        threadId: threadId
                    }, function(err, result) {
                        return (null != result ? result.deleted : void 0) === !0 ? (showNotification("Note deleted.", 5), 
                        ri.showPromotion(), refreshInbox(), disableAddNoteButton(buttonId), ri.notedThreads[threadId] = !1) : (hideNotification(), 
                        modelBox({
                            title: "Right Inbox Error (Err: 019)",
                            message: "Cannot delete the note at the moment. Please try again later.<br /> If you have any questions please <a href='mailto:support@rightinbox.com?subject=About Err 019&body=Hi, I have come across Error 019 while using Right Inbox. Please have a look.'>let us know</a>",
                            button1: {
                                text: "Close",
                                color: "white",
                                focused: !0,
                                color: "blue",
                                action: function() {
                                    return closeModelBox(), toggleAddNote(buttonId);
                                }
                            }
                        }));
                    });
                }, deleteNoteAction = function(threadId, buttonId) {
                    var addNoteButton, ref;
                    return addNoteButton = getAddNoteButton(buttonId), !isComposeWindow(addNoteButton) && !isReplyScreen(addNoteButton) || (null != (ref = ri.notedThreads) ? ref[threadId] : void 0) ? modelBox({
                        title: "Delete note?",
                        message: "Please confirm to delete the note.",
                        button2: {
                            enabled: !0,
                            text: "Delete",
                            color: "blue",
                            width: 12,
                            action: function() {
                                return closeModelBox(), $("#add_note_window_" + buttonId, getCanvasScope()).remove(), 
                                deleteNote(threadId, buttonId);
                            }
                        },
                        button1: {
                            text: "Cancel",
                            enabled: !0,
                            action: function() {
                                return closeModelBox(), toggleAddNote(buttonId);
                            }
                        }
                    }) : (disableAddNoteButton(buttonId), toggleAddNote(buttonId), delete ri.addNoteData[addNoteButton.selector]);
                }, addNoteAction = function(buttonId) {
                    var addNoteButton, addNoteData, parentWin, ref, showSendButtonTooltip, text, threadId;
                    return text = $("#add_note_window_textarea_" + buttonId).val(), addNoteButton = getAddNoteButton(buttonId), 
                    threadId = isComposeWindow(addNoteButton) ? getDraftThreadId(addNoteButton) : getThreadId(1), 
                    0 === text.length ? deleteNoteAction(threadId, buttonId) : (enableAddNoteButton(buttonId, text), 
                    $("#add_note_window_" + buttonId, getCanvasScope()).remove(), parentWin = getParentWin(addNoteButton), 
                    addNoteData = {
                        text: text,
                        labelNote: ri.preferences.labelNote
                    }, ri.addNoteData[addNoteButton.selector] = addNoteData, jsLog.goal("core"), jsLog.goal("add_note"), 
                    isComposeWindow(addNoteButton) ? jsLog.goal("add_note_new") : isReplyScreen(addNoteButton) ? jsLog.goal("add_note_reply") : jsLog.goal("add_note_conversation"), 
                    showSendButtonTooltip = function() {
                        return setTimeout(function() {
                            var sendButton;
                            if (sendButton = ri.sendButton(parentWin), sendButton.length > 0 && ri.addNoteData[addNoteButton.selector]) return showTooltip(sendButton, "Note is added. It will be saved when you send your email");
                        }, 5e3);
                    }, isComposeWindow(addNoteButton) || threadId ? !isComposeWindow(addNoteButton) && !isReplyScreen(addNoteButton) || null != (ref = ri.notedThreads) && ref[threadId] ? threadId ? (ri.addNoteData[addNoteButton.selector].threadId = threadId, 
                    addNote(addNoteButton)) : void 0 : isComposeWindow(addNoteButton) ? (checkSentNotificationMessage("addNote", addNote, addNoteButton), 
                    showSendButtonTooltip()) : isReplyScreen(addNoteButton) ? (ri.addNoteData[addNoteButton.selector].threadId = threadId, 
                    checkSentNotificationMessage("addNote", addNote, addNoteButton), showSendButtonTooltip()) : (ri.addNoteData[addNoteButton.selector].threadId = threadId, 
                    addNote(addNoteButton)) : (modelBox({
                        title: "Right Inbox Error (Err: 074)",
                        message: "Cannot add note at the moment. Please try again later.<br /> If you have any questions please <a href='mailto:support@rightinbox.com?subject=About Err 074&body=Hi, I have come across Error 074 while using Right Inbox. Please have a look.'>let us know</a>",
                        button1: {
                            text: "Close",
                            color: "white",
                            focused: !0
                        }
                    }), jsLog.error({
                        type: "Err074"
                    })));
                }, toggleAddNote = function(buttonId, unsavedChange) {
                    var addNoteButton, addNoteWindow, recurringButton, ref, ref1, sendLaterButton, text, threadId;
                    if (null == unsavedChange && (unsavedChange = !1), isSplitView() && $(".apf").length > 0) return modelBox({
                        title: "Cannot add notes to selected conversations.",
                        message: "Currently, adding notes to multiple conversations at once is not supported.<br /> If you have any questions please <a href='mailto:support@rightinbox.com?subject=About Case 029'>let us know</a>",
                        button1: {
                            text: "Close",
                            color: "blue"
                        }
                    });
                    if ($("#add_note_window_" + buttonId + ":visible").length > 0) return $("#add_note_window_" + buttonId, getCanvasScope()).remove();
                    if (addNoteButton = getAddNoteButton(buttonId), 0 !== addNoteButton.length && ri.checkQuota("numNoted")) {
                        if (threadId = isComposeWindow(addNoteButton) ? getDraftThreadId(addNoteButton) : getThreadId(2), 
                        text = (null != (ref = ri.addNoteData["#add_note_" + buttonId]) ? ref.text : void 0) || (null != (ref1 = ri.notedThreads[threadId]) ? ref1.text : void 0) || "", 
                        addNoteWindow = function() {
                            var buttonsRow, noteWindow, offset, ref2, ref3, rid;
                            return rid = randomId(), noteWindow = $("<div id='add_note_window_" + buttonId + "' class='ZF-Av' style='-webkit-user-select: none;visibility: visible; width:340px'> <div class='SK ZF-zT' style='padding:2px 2px 6px'> <div class='ZZ'> <div class='w-Nw'> <span class='w-Pv'> <textarea class='ZH nr aQf' id='add_note_window_textarea_" + buttonId + "' style='resize:none; height:160px' placeholder='Type a private note for yourself...'>" + text + "</textarea> </span> </div> <div id='add_note_window_warning_" + buttonId + "' class='w-Nw' style='display:none'> </div> <div class='w-Nw' style='padding-top:8px'> <span id='" + rid + "'></span> </div> </div> </div> </div>"), 
                            noteWindow.insertAfter(addNoteButton), buttonsRow = $("#" + rid), offset = addNoteButton.offset(), 
                            offset.top += 29, noteWindow.width() + offset.left + 20 > window.innerWidth && (offset.left = window.innerWidth - noteWindow.width() - 20), 
                            getParentWin(addNoteButton).length > 0 && (offset.top = addNoteButton.offset().top - noteWindow.find(">:first-child").height() - 8), 
                            noteWindow.offset(offset), $("#add_note_window_textarea_" + buttonId).focus(), $("#add_note_window_textarea_" + buttonId).on("keydown", function(e) {
                                var textLength;
                                switch (unsavedChange = !0, textLength = $("#add_note_window_textarea_" + buttonId).val().length, 
                                !1) {
                                  case !(textLength < 1900):
                                    return $("#add_note_window_warning_" + buttonId).hide();

                                  case !(2e3 >= textLength && textLength >= 1900):
                                    return $("#add_note_window_warning_" + buttonId).removeClass("font-red").show().html("Maximum 2000 characters (" + (2e3 - textLength) + " remaning)");

                                  case !(textLength > 2e3):
                                    return $("#add_note_window_warning_" + buttonId).addClass("font-red").show().html("Maximum 2000 characters (" + (textLength - 2e3) + " too many)");
                                }
                            }), $("body", getCanvasScope()).on("mousedown.add_note", function(e) {
                                if (!unsavedChange && 0 === $(e.target).closest("#add_note_window_" + buttonId).length && $(e.target).attr("id") !== "add_note_" + buttonId && $(e.target).parent().attr("id") !== "add_note_" + buttonId) return $("#add_note_window_" + buttonId, getCanvasScope()).remove(), 
                                $("body", getCanvasScope()).off("mousedown.add_note");
                            }), text.length > 0 && (null != (null != (ref2 = ri.notedThreads) ? ref2[threadId] : void 0) || null != (null != (ref3 = ri.addNoteData) ? ref3[addNoteButton.selector] : void 0)) && uiButton({
                                id: "delete_note_" + buttonId,
                                className: "transparent-bg-delete-link",
                                text: "Delete Note",
                                noDelegate: !0,
                                insertAfter: buttonsRow,
                                action: function() {
                                    return deleteNoteAction(threadId, buttonId);
                                }
                            }), uiButton({
                                id: "cancel_note_" + buttonId,
                                className: "",
                                text: 0 === text.length ? "Cancel" : "Close",
                                noDelegate: !0,
                                color: "white",
                                insertAfter: buttonsRow,
                                action: function() {
                                    return $("#add_note_window_" + buttonId, getCanvasScope()).remove();
                                }
                            }), uiButton({
                                id: "save_note_" + buttonId,
                                className: "",
                                text: "Save Note",
                                noDelegate: !0,
                                color: "blue",
                                insertAfter: buttonsRow,
                                action: function() {
                                    return addNoteAction(buttonId);
                                }
                            });
                        }, addNoteButton.hasClass("T-I-RIy")) return addNoteWindow();
                        if (ri.checkQuota("numNoted")) return sendLaterButton = getSendLaterButton(buttonId), 
                        recurringButton = getRecurringButton(buttonId), sendLaterButton.hasClass("T-I-RIr") ? modelBox({
                            title: "Error",
                            message: "You cannot add a note when a scheduled email is enabled as well. You need to cancel the scheduled email before adding a note.",
                            button1: {
                                text: "OK",
                                color: "white",
                                focused: !0
                            }
                        }) : recurringButton.hasClass("T-I-RIg") ? modelBox({
                            title: "Error",
                            message: "You cannot add a note when a recurring email is enabled as well. You need to cancel the recurring email before adding a note.",
                            button1: {
                                text: "OK",
                                color: "white",
                                focused: !0
                            }
                        }) : addNoteWindow();
                    }
                }, emailReminderPrefs = function(buttonId) {
                    var parts;
                    return jsLog.goal("reminder_prefs_open"), parts = [ [ "checkbox", "Only if nobody responds", "ifNoResponse", "If checked, the conversation will be reminded and returned to inbox only if there is no response" ], [ "seperator" ], [ "checkbox", "Return to inbox", "returnToInbox", "If the conversation was archived it will return back to your inbox" ], [ "checkbox", "Star it", "star" ], [ "checkbox", "Mark as unread", "markAsUnread" ], [ "checkbox", "Label as <span class='ri_gray_label'>Reminder</span> when reminded", "labelAs" ], [ "checkbox", "Label as <span class='ri_gray_label'>To Be Reminded</span> until reminded", "labelAsToBeReminded", "If you would like keep track of reminders that you have set, you can have this option checked. So you can inspect later which conversations are set to be reminded." ] ], 
                    isComposeWindow(getSendLaterButton(buttonId)) || (parts.push([ "seperator" ]), parts.push([ "checkbox", "Archive this conversation after the reminder is set", "archiveRemembered" ]), 
                    isSplitView() || parts.push([ "checkbox", "Return back to previous page after the reminder is set", "reminderReturnBack", "For example, if you opened up this email from your Inbox, it will return back to the Inbox view" ])), 
                    isConversaionViewModeEnabled() && parts.splice(3, 0, [ "checkbox", "Put it at the top of inbox", "atTheTop", "An additional email will be appended to this conversation by Right Inbox to be able put the conversation at the top of inbox (This will not work if you have disabled conversation view mode)" ]), 
                    uiMenu({
                        id: "ri_etp",
                        parts: parts,
                        clickOutButton: getReminderPrefButton(buttonId)
                    });
                }, toggleReminder = function(buttonId) {
                    var recurringButton, reminderButton, reminderPrefs, sendLaterButton;
                    return isSplitView() && $(".apf").length > 0 ? modelBox({
                        title: "Cannot add reminders to selected conversations.",
                        message: "Currently, adding reminders to multiple conversations at once is not supported.<br /> If you have any questions please <a href='mailto:support@rightinbox.com?subject=About Case 029'>let us know</a>",
                        button1: {
                            text: "Close",
                            color: "blue"
                        }
                    }) : (reminderButton = getReminderButton(buttonId), reminderButton.hasClass("T-I-RIo") ? (unRemindEmail(buttonId), 
                    disableReminderButton(buttonId)) : ri.checkQuota("numRemembered") ? (sendLaterButton = getSendLaterButton(buttonId), 
                    recurringButton = getRecurringButton(buttonId), sendLaterButton.hasClass("T-I-RIr") ? modelBox({
                        title: "Error",
                        message: "You cannot add a reminder to a scheduled email. You need to cancel the email schedule before adding a reminder.",
                        button1: {
                            text: "OK",
                            color: "white",
                            focused: !0
                        }
                    }) : recurringButton.hasClass("T-I-RIg") ? modelBox({
                        title: "Error",
                        message: "You cannot add a reminder to a recurring email. You need to cancel the email recurrence before adding a reminder.",
                        button1: {
                            text: "OK",
                            color: "white",
                            focused: !0
                        }
                    }) : (reminderPrefs = [ ri.preferences.returnToInbox, ri.preferences.star, ri.preferences.markAsUnread, ri.preferences.atTheTop, ri.preferences.labelAs, ri.preferences.labelAsToBeReminded, ri.preferences.archiveRemembered ], 
                    _u.indexOf(reminderPrefs, !0) === -1 ? modelBox({
                        title: "Error",
                        message: "Please make sure you have enabled at least one of the reminder preferences from the drop-down options menu and try again.",
                        button1: {
                            text: "Show me the preferences",
                            color: "blue",
                            action: function() {
                                return closeModelBox(), emailReminderPrefs(buttonId);
                            }
                        }
                    }) : uiMenu({
                        id: "ri_rm",
                        parts: generateCustomTimeOptions(ri.preferences.customTimes.reminder, remindEmailAction, buttonId, "Add reminder"),
                        clickOutButton: reminderButton
                    }))) : void 0);
                }, disableReminderButton = function(buttonId, disableOtherButton) {
                    var otherButton, reminderButton, reminderPrefButton, threadId;
                    if (null == disableOtherButton && (disableOtherButton = !0), reminderButton = getReminderButton(buttonId), 
                    reminderPrefButton = getReminderPrefButton(buttonId), reminderButton.add(reminderPrefButton).addClass("T-I-ax7").removeClass("T-I-RIo"), 
                    reminderButton.add(reminderPrefButton).find(".T-Jo-Jp").addClass("T-Jo-iAfbIe").removeClass("T-Jo-Jp").removeClass("T-Jo-RI"), 
                    reminderButton.add(reminderPrefButton).attr("data-tooltip", ""), delete ri.remindEmailData[reminderButton.selector], 
                    disableOtherButton && !isComposeWindow(reminderButton) && (threadId = reminderButton.attr("data-threadid"), 
                    threadId && (otherButton = $("[role='button'][data-threadid='" + threadId + "']", getCanvasScope()).filter(function() {
                        return 0 !== $(this).attr("id").indexOf("reminder") && $(this).attr("id").match(/ri_\d+/)[0] !== buttonId;
                    }), otherButton.length > 0))) return disableReminderButton(otherButton.attr("id").match(/ri_\d+/)[0], !1);
                }, enableReminderButton = function(date, buttonId, enableOtherButton) {
                    var m, otherButton, reminderButton, reminderPrefButton, threadId, tooltip;
                    if (null == enableOtherButton && (enableOtherButton = !0), m = moment(date), tooltip = (m.diff(moment(), "days") < 7 ? m.calendar() : m.format("ddd, MMM Do h:mm A")) + (" (" + m.fromNow() + ")"), 
                    reminderButton = getReminderButton(buttonId), reminderPrefButton = getReminderPrefButton(buttonId), 
                    reminderButton.add(reminderPrefButton).removeClass("T-I-ax7").addClass("T-I-RIo"), 
                    reminderButton.add(reminderPrefButton).find(".T-Jo-iAfbIe").removeClass("T-Jo-iAfbIe").addClass("T-Jo-Jp").addClass("T-Jo-RI"), 
                    reminderButton.add(reminderPrefButton).attr("data-tooltip", "Reminder is set to " + tooltip + ". Click again, to disable reminder for this conversation."), 
                    reminderButton.add(reminderPrefButton).attr("data-tooltip-delay", "800"), enableOtherButton && !isComposeWindow(reminderButton) && (threadId = reminderButton.attr("data-threadid"), 
                    threadId && (otherButton = $("[role='button'][data-threadid='" + threadId + "']", getCanvasScope()).filter(function() {
                        return 0 !== $(this).attr("id").indexOf("reminder") && $(this).attr("id").match(/ri_\d+/)[0] !== buttonId;
                    }), otherButton.length > 0))) return enableReminderButton(date, otherButton.attr("id").match(/ri_\d+/)[0], !1);
                }, remindEmailAction = function(date, buttonId) {
                    var parentWin, reminderButton, showSendButtonTooltip, threadId;
                    return enableReminderButton(date, buttonId), reminderButton = getReminderButton(buttonId), 
                    parentWin = getParentWin(reminderButton), ri.remindEmailData[reminderButton.selector] = {
                        date: date
                    }, jsLog.goal("core"), jsLog.goal("remembered"), isComposeWindow(reminderButton) ? jsLog.goal("remembered_new") : isReplyScreen(reminderButton) ? jsLog.goal("remembered_reply") : jsLog.goal("remembered_conversation"), 
                    showSendButtonTooltip = function() {
                        return setTimeout(function() {
                            var sendButton;
                            if (sendButton = ri.sendButton(parentWin), sendButton.length > 0 && ri.remindEmailData[reminderButton.selector]) return showTooltip(sendButton, "Reminder is set. You can send your email when you finish writing.");
                        }, 5e3);
                    }, isComposeWindow(reminderButton) ? (checkSentNotificationMessage("remindEmail", remindEmail, reminderButton), 
                    showSendButtonTooltip()) : isReplyScreen(reminderButton) ? (ri.remindEmailData[reminderButton.selector].threadId = getThreadId(3), 
                    checkSentNotificationMessage("remindEmail", remindEmail, reminderButton), showSendButtonTooltip()) : (threadId = getThreadId(4), 
                    threadId ? (ri.remindEmailData[reminderButton.selector].threadId = threadId, remindEmail(reminderButton)) : (disableReminderButton(buttonId), 
                    modelBox({
                        title: "Right Inbox Error (Err: 083)",
                        message: "Cannot set a reminder at the moment. Please try again later.<br /> If you have any questions please <a href='mailto:support@rightinbox.com?subject=About Err 083&body=Hi, I have come across Error 083 while using Right Inbox. Please have a look.'>let us know</a>",
                        button1: {
                            text: "Close",
                            color: "white",
                            focused: !0
                        }
                    }), jsLog.error({
                        type: "Err083"
                    })));
                }, sendLaterPrefs = function(buttonId) {
                    var parts;
                    return jsLog.goal("sendlater_prefs_open"), parts = [ [ "checkbox", "Label as <span class='ri_gray_label'>Scheduled</span> until delivered", "labelScheduled" ] ], 
                    isReplyScreen(getSendLaterButton(buttonId)) && (isSplitView() || parts.push([ "checkbox", "Return back to previous page after the email is scheduled", "schedulerReturnBack", "For example, if you opened up this email from your Inbox, it will return back to the Inbox view" ]), 
                    parts.push([ "checkbox", "Archive this conversation when scheduled", "archiveScheduled" ]), 
                    parts.unshift([ "seperator" ]), parts.unshift([ "checkbox", "Only if nobody responds", "ifNoResponseLater", "If checked, your response will be sent only if there is no response" ])), 
                    uiMenu({
                        id: "ri_slp",
                        parts: parts,
                        clickOutButton: getSendLaterPrefButton(buttonId)
                    });
                }, cancelScheduledEmail = function(buttonId) {
                    var clearSubject, hideMessageWindow, modifiedSubject, parentWin, scheduledEmailDetails, sendLaterButton;
                    return jsLog.goal("unscheduled"), sendLaterButton = getSendLaterButton(buttonId), 
                    parentWin = getParentWin(sendLaterButton), scheduledEmailDetails = getScheduledEmailDetails(sendLaterButton), 
                    hideMessageWindow = function() {
                        if ($(".Ha", parentWin).length > 0 && simulateClick($(".Ha", parentWin)), $(".aVN:visible .Ha").length > 0) return simulateClick($(".aVN:visible .Ha").last());
                    }, scheduledEmailDetails ? (closeModelBox(), showNotification("Canceling scheduled email is in progress. Please wait.", 30), 
                    modifiedSubject = $("input[name='subjectbox']", parentWin).val(), clearSubject = modifiedSubject.replace(new RegExp(" ?- Recurring email repeats.*"), "").replace(new RegExp(" ?- Scheduled to be sent at.*"), ""), 
                    updateSubject(clearSubject, modifiedSubject, sendLaterButton, function() {
                        var schedulingData;
                        return parentWin.hide(), hideNotification(), hideMessageWindow(), showFinishedNotification("scheduled email is canceled"), 
                        schedulingData = {
                            subject: clearSubject
                        }, isReplyScreen(getSendLaterButton(buttonId)) && (schedulingData.threadId = getThreadId(5)), 
                        requestXMLHttp("unScheduleEmail", schedulingData, function(err, result) {});
                    })) : (hideNotification(), hideMessageWindow(), modelBox({
                        title: "Right Inbox Error (Err: 063)",
                        message: "Canceling the scheduled email was unsuccessful due to some problem. Please try again later. Alternatively you may just discard (delete) this draft message to cancel the scheduled delivery.<br /> If you have any questions please <a href='mailto:support@rightinbox.com?subject=About Err 063&body=Hi, I have come across Error 063 while using Right Inbox. Please have a look.'>let us know</a>",
                        button1: {
                            text: "OK",
                            color: "white",
                            focused: !0
                        }
                    }));
                }, toggleSendLater = function(buttonId) {
                    var recurringButton, reminderButton, sendLaterButton;
                    return sendLaterButton = getSendLaterButton(buttonId), sendLaterButton.hasClass("T-I-RIr") ? showDetailedDatePickerWindow("Save", scheduleSend, buttonId) : (reminderButton = getReminderButton(buttonId), 
                    recurringButton = getRecurringButton(buttonId), recurringButton.hasClass("T-I-RIg") ? modelBox({
                        title: "Error",
                        message: "You cannot schedule emails when a recurring email is enabled as well. First, you need to cancel the recurring email if you would like to scheduled this email.",
                        button1: {
                            text: "OK",
                            color: "white",
                            focused: !0
                        }
                    }) : sendLaterAction(buttonId));
                }, sendLaterAction = function(buttonId) {
                    var numRecepients;
                    if (numRecepients = 0, $("input[name='to'],input[name='bcc'],input[name='cc']", getParentWin(getSendLaterButton(buttonId))).map(function(index, item) {
                        if ("" !== $(item).val()) return numRecepients++;
                    }), ri.checkQuota("numScheduled")) return 0 === numRecepients ? modelBox({
                        title: "Error",
                        message: "Please specify at least one recipient.",
                        button1: {
                            text: "OK",
                            color: "white",
                            focused: !0
                        }
                    }) : numRecepients > 99 ? modelBox({
                        title: "Error",
                        message: "You cannot schedule messages to be sent more than 99 recipients at once. ",
                        button1: {
                            text: "OK",
                            color: "white",
                            focused: !0
                        }
                    }) : uiMenu({
                        id: "ri_slm",
                        parts: generateCustomTimeOptions(ri.preferences.customTimes.sendLater, scheduleSend, buttonId, "Schedule"),
                        clickOutButton: getSendLaterButton(buttonId)
                    });
                }, scheduleSend = function(date, buttonId) {
                    var modifiedSubject, numFound, originalSubject, parentWin, scheduleText, sendLaterButton;
                    return sendLaterButton = getSendLaterButton(buttonId), parentWin = getParentWin(sendLaterButton), 
                    replaceSubjectBox(parentWin), scheduleText = "Scheduled to be sent at", originalSubject = $("input[name='subjectbox']", parentWin).val().replace(new RegExp(" ?- " + scheduleText + ".*"), "").replace(new RegExp(" ?- Recurring email repeats.*"), ""), 
                    modifiedSubject = originalSubject + (" - " + scheduleText + " " + date.toString().replace(/\(.+\)/, "")), 
                    numFound = $(".aHU:visible .Bk").length, isReplyScreen(sendLaterButton) && (modifiedSubject += "#" + getThreadId(6), 
                    ri.preferences.ifNoResponseLater && numFound > 0 && (modifiedSubject += "+" + numFound)), 
                    showInProgressNotification("scheduling"), updateSubject(modifiedSubject, originalSubject, sendLaterButton, function() {
                        return parentWin.hide(), scheduleEmail(date.toString(), buttonId);
                    });
                }, enableSendLaterButton = function(scheduledEmailDetails, buttonId) {
                    var date, sendLaterButton, sendLaterPrefButton, tooltip;
                    return date = moment(scheduledEmailDetails), tooltip = "Scheduled to be sent on " + date.format("ddd, MMM Do [at] h:mm A Z"), 
                    date.isAfter(moment()) && (tooltip += " (in about " + date.fromNow(!0) + ")"), sendLaterButton = getSendLaterButton(buttonId), 
                    sendLaterPrefButton = getSendLaterPrefButton(buttonId), sendLaterButton.add(sendLaterPrefButton).removeClass("T-I-ax7").addClass("T-I-RIr"), 
                    sendLaterButton.add(sendLaterPrefButton).find(".T-Jo-iAfbIe").removeClass("T-Jo-iAfbIe").addClass("T-Jo-Jp").addClass("T-Jo-RI"), 
                    sendLaterButton.add(sendLaterPrefButton).attr("data-tooltip", tooltip + ". Click to modify."), 
                    sendLaterButton.add(sendLaterPrefButton).attr("data-tooltip-delay", "0"), setTimeout(function() {
                        return showTooltip(sendLaterButton, sendLaterButton.attr("data-tooltip"));
                    }, 500), replaceSendNowButton(sendLaterButton, "scheduled email"), replaceSubjectBox(getParentWin(sendLaterButton));
                }, recurringPrefs = function(buttonId) {
                    var parts;
                    return jsLog.goal("recurring_prefs_open"), parts = [ [ "checkbox", "Label as <span class='ri_gray_label'>Recurring</span>", "labelRecurring" ] ], 
                    uiMenu({
                        id: "ri_rp",
                        parts: parts,
                        clickOutButton: getRecurringPrefButton(buttonId)
                    });
                }, toggleRecurring = function(buttonId) {
                    var addNoteButton, numRecepients, recurringButton, reminderButton, sendLaterButton;
                    if (recurringButton = getRecurringButton(buttonId), numRecepients = 0, $("input[name='to'],input[name='bcc'],input[name='cc']", getParentWin(recurringButton)).map(function(index, item) {
                        if ("" !== $(item).val()) return numRecepients++;
                    }), ri.checkQuota("numRecurring")) return 0 === numRecepients ? modelBox({
                        title: "Error",
                        message: "Please specify at least one recipient.",
                        button1: {
                            text: "OK",
                            color: "white",
                            focused: !0
                        }
                    }) : numRecepients > 99 ? modelBox({
                        title: "Error",
                        message: "You cannot schedule recurring messages to be sent more than 100 recipients at once. ",
                        button1: {
                            text: "OK",
                            color: "white",
                            focused: !0
                        }
                    }) : (reminderButton = getReminderButton(buttonId), sendLaterButton = getSendLaterButton(buttonId), 
                    addNoteButton = getAddNoteButton(buttonId), reminderButton.hasClass("T-I-RIo") ? modelBox({
                        title: "Error",
                        message: "You cannot schedule recurring emails when an email reminder is enabled as well. You need to disable the email reminder before scheduling a recurring email.",
                        button1: {
                            text: "OK",
                            color: "white",
                            focused: !0
                        }
                    }) : sendLaterButton.hasClass("T-I-RIr") ? modelBox({
                        title: "Error",
                        message: "You cannot create recurring emails when a scheduled email is enabled as well. You need to cancel the scheduled email before adding this recurring email.",
                        button1: {
                            text: "OK",
                            color: "white",
                            focused: !0
                        }
                    }) : addNoteButton.hasClass("T-I-RIy") ? modelBox({
                        title: "Error",
                        message: "You cannot schedule recurring emails when you have alreaded added a note. You need to remove the note before scheduling a recurring email.",
                        button1: {
                            text: "OK",
                            color: "white",
                            focused: !0
                        }
                    }) : recurringButton.hasClass("T-I-RIg") ? showRecurringDatePickerWindow("Save", recurringEmailAction, buttonId) : showRecurringDatePickerWindow("Schedule", recurringEmailAction, buttonId));
                }, cancelRecurringEmailAction = function(buttonId) {
                    var clearSubject, hideMessageWindow, modifiedSubject, parentWin, recurringButton, recurringEmailId, recurringText;
                    return jsLog.goal("unrecurring"), recurringButton = getRecurringButton(buttonId), 
                    parentWin = getParentWin(recurringButton), recurringEmailId = getRecurringEmailId(recurringButton), 
                    hideMessageWindow = function() {
                        if ($(".Ha", parentWin).length > 0 && simulateClick($(".Ha", parentWin)), $(".aVN:visible .Ha").length > 0) return simulateClick($(".aVN:visible .Ha").last());
                    }, recurringEmailId ? (closeModelBox(), showNotification("Canceling recurring email is in progress. Please wait.", 30), 
                    recurringText = "Recurring email repeats ", modifiedSubject = $("input[name='subjectbox']", parentWin).val(), 
                    clearSubject = modifiedSubject.replace(new RegExp(" ?- " + recurringText + ".*"), "").replace(new RegExp(" ?- Scheduled to be sent at.*"), ""), 
                    updateSubject(clearSubject, modifiedSubject, recurringButton, function() {
                        return parentWin.hide(), requestXMLHttp("unRecurringEmail", {
                            recurringEmailId: recurringEmailId,
                            threadId: getThreadId(7)
                        }, function(err, result) {
                            if (err || (null != result ? result.unRecurring : void 0) !== !0) {
                                if (recurringButton = getRecurringButton(buttonId), parentWin = getParentWin(recurringButton), 
                                updateSubject(modifiedSubject, clearSubject, recurringButton, function() {}), isComposeWindow(recurringButton) && parentWin.show(), 
                                (null != result ? result.unRecurring : void 0) !== !0) return modelBox({
                                    title: "Right Inbox Error (Err: 092)",
                                    message: "Canceling the recurring email was unsuccessful due to some problem. Please try again later.<br /> Alternatively you may just discard (delete) this draft message to stop recurring delivery.<br /> If you have any questions please <a href='mailto:support@rightinbox.com?subject=About Err 092&body=Hi, I have come across Error 092 while using Right Inbox. Please have a look.'>let us know</a>",
                                    button1: {
                                        text: "Close",
                                        color: "white",
                                        focused: !0
                                    }
                                });
                            } else if (hideNotification(), ri.freeQuota("numRecurring"), delete ri.recurringEmailsData[recurringEmailId], 
                            showFinishedNotification("recurring email is canceled"), hideMessageWindow(), location.search.indexOf("btop") === -1) return location.href = "#drafts";
                        });
                    })) : (hideNotification(), hideMessageWindow(), modelBox({
                        title: "Right Inbox Error (Err: 093)",
                        message: "Canceling the recurring email was unsuccessful due to some problem. Please try again later. .<br /> If you have any questions please <a href='mailto:support@rightinbox.com?subject=About Err 093&body=Hi, I have come across Error 093 while using Right Inbox. Please have a look.'>let us know</a>",
                        button1: {
                            text: "OK",
                            color: "white",
                            focused: !0
                        }
                    }));
                }, recurringEmailAction = function(recurringEmailData, buttonId) {
                    var clearSubject, modifiedSubject, parentWin, recurringButton, recurringEmailId, recurringText;
                    return recurringButton = getRecurringButton(buttonId), recurringEmailId = uuid(), 
                    parentWin = getParentWin(recurringButton), replaceSubjectBox(parentWin), jsLog.goal("core"), 
                    jsLog.goal("recurring"), isComposeWindow(recurringButton) ? jsLog.goal("recurring_new") : jsLog.goal("recurring_reply"), 
                    recurringText = "Recurring email repeats ", clearSubject = $("input[name='subjectbox']", parentWin).val().replace(new RegExp(" ?- " + recurringText + ".*"), "").replace(new RegExp(" ?- Scheduled to be sent at.*"), ""), 
                    modifiedSubject = clearSubject + " - " + recurringText + new RiRecur(recurringEmailData).summary() + "   #" + recurringEmailId, 
                    showNotification("Please wait. Recurring email scheduling is in progress.", 30), 
                    updateSubject(modifiedSubject, clearSubject, recurringButton, function() {
                        return parentWin.hide(), recurringEmailData.recurringEmailId = recurringEmailId, 
                        recurringEmailData.labelRecurring = ri.preferences.labelRecurring, recurringEmail(recurringEmailData, buttonId);
                    });
                }, recurringEmail = function(recurringEmailData, buttonId) {
                    return requestXMLHttp("recurringEmail", recurringEmailData, function(err, result) {
                        var clearSubject, hideMessageWindow, modifiedSubject, parentWin, recurringButton;
                        if (recurringButton = getRecurringButton(buttonId), parentWin = getParentWin(recurringButton), 
                        hideNotification(), hideMessageWindow = function() {
                            if ($(".Ha", parentWin).length > 0 && simulateClick($(".Ha", parentWin)), $(".aVN:visible .Ha").length > 0) return simulateClick($(".aVN:visible .Ha").last());
                        }, err || (null != result ? result.scheduled : void 0) !== !0) {
                            if (modifiedSubject = $("input[name='subjectbox']", parentWin).val(), clearSubject = modifiedSubject.replace(new RegExp(" ?- Recurring email repeats.*"), "").replace(new RegExp(" ?- Scheduled to be sent at.*"), ""), 
                            updateSubject(clearSubject, modifiedSubject, recurringButton, function() {}), isComposeWindow(recurringButton) && parentWin.show(), 
                            (null != result ? result.scheduled : void 0) !== !0) return modelBox({
                                title: "Right Inbox Error (Err: 049)",
                                message: "Recurring email cannot be scheduled at the moment. Please try again later.<br /> If you have any questions please <a href='mailto:support@rightinbox.com?subject=About Err 049&body=Hi, I have come across Error 049 while using Right Inbox. Please have a look. Details: " + JSON.stringify(schedulingData) + "'>let us know</a>",
                                button1: {
                                    text: "Close",
                                    color: "white",
                                    focused: !0
                                }
                            });
                        } else if (result.scheduled === !0) return showFinishedNotification("recurring email has been scheduled"), 
                        ri.showPromotion(), refreshInbox(), ri.useQuota("numRecurring"), hideMessageWindow();
                    });
                }, enableRecurringButton = function(data, buttonId) {
                    var recur;
                    return recur = new RiRecur(data), recur.next(function(err, nextOccurrence) {
                        var recurringButton, recurringPrefButton, tooltip;
                        return tooltip = recur.summary() + ". Next occurrence is on " + nextOccurrence.format("ddd, MMM Do [at] h:mm A Z") + (" (in about " + nextOccurrence.fromNow(!0) + ")"), 
                        recurringButton = getRecurringButton(buttonId), recurringPrefButton = getRecurringPrefButton(buttonId), 
                        recurringButton.add(recurringPrefButton).removeClass("T-I-ax7").addClass("T-I-RIg"), 
                        recurringButton.add(recurringPrefButton).find(".T-Jo-iAfbIe").removeClass("T-Jo-iAfbIe").addClass("T-Jo-Jp").addClass("T-Jo-RI"), 
                        recurringButton.add(recurringPrefButton).attr("data-tooltip", "Recurring email repeats " + tooltip + ". Click to modify."), 
                        recurringButton.add(recurringPrefButton).attr("data-tooltip-delay", "0"), setTimeout(function() {
                            return showTooltip(recurringButton, recurringButton.attr("data-tooltip"));
                        }, 500), replaceSendNowButton(recurringButton, "recurring email"), replaceSubjectBox(getParentWin(recurringButton));
                    });
                }, window.authCheck = ri.authCheck = function(force, callback) {
                    return null == force && (force = !1), requestXMLHttp("handShake", {
                        force: force,
                        location: window.location.href
                    }, function(err, result) {
                        if (!err) return ri.monthlyQuota = result.monthlyQuota, ri.referralId = result.referralId, 
                        "none" === result.notedThreads ? ri.notedThreads = {
                            localcache: !0
                        } : null == result.notedThreads ? ri.notedThreads = {} : (ri.notedThreads = result.notedThreads, 
                        ri.notedThreads.localcache = !0), "none" === result.rememberedThreads ? ri.rememberedThreads = {
                            localcache: !0
                        } : null == result.rememberedThreads ? ri.rememberedThreads = {} : (ri.rememberedThreads = result.rememberedThreads, 
                        ri.rememberedThreads.localcache = !0), result.preferences && (handleUserPrefs(result.preferences), 
                        "function" == typeof callback && callback()), result.error && !result.auth ? modelBox({
                            title: "Right Inbox authentication error",
                            message: 'Right Inbox cannot be utilized because we are not able to verify your identity.<br /> You may try again later or please <a href="mailto:support@rightinbox.com">let us know</a> if you have any questions.',
                            button1: {
                                text: "Close",
                                color: "blue"
                            }
                        }) : result.auth === !1 ? modelBox({
                            title: "Right Inbox is almost ready!",
                            message: "You will soon be able to start using our service. Please continue to finish installation.",
                            button1: {
                                text: "Continue",
                                color: "blue",
                                action: function() {
                                    return redirectToAuth(result.redirect);
                                }
                            },
                            closeAction: function() {
                                return disablePrompt();
                            }
                        }) : "function" == typeof callback ? callback() : void 0;
                    });
                }, scheduleEmail = function(date, buttonId) {
                    var href, schedulingData, sendLaterButton;
                    return sendLaterButton = getSendLaterButton(buttonId), href = location.href, jsLog.goal("core"), 
                    jsLog.goal("scheduled"), isReplyScreen(sendLaterButton) ? jsLog.goal("scheduled_reply") : jsLog.goal("scheduled_new"), 
                    schedulingData = {
                        dateScheduled: date.toString(),
                        labelScheduled: ri.preferences.labelScheduled
                    }, isReplyScreen(getSendLaterButton(buttonId)) ? (schedulingData.archiveScheduled = ri.preferences.archiveScheduled, 
                    schedulingData.threadId = getThreadId(8), schedulingData = extendWithComposeHeaders(sendLaterButton, schedulingData, {
                        from: "from",
                        to: "to",
                        cc: "cc",
                        bcc: "bcc",
                        subject: "subject",
                        date: "date"
                    })) : schedulingData.archiveScheduled && (schedulingData = extendWithComposeHeaders(sendLaterButton, schedulingData, {
                        subject: "subject"
                    })), requestXMLHttp("scheduleEmail", schedulingData, function(err, result) {
                        var hideMessageWindow, modifiedSubject, originalSubject, parentWin, reminderButton;
                        if (sendLaterButton = getSendLaterButton(buttonId), parentWin = getParentWin(sendLaterButton), 
                        hideMessageWindow = function() {
                            if ($(".Ha", parentWin).length > 0 && simulateClick($(".Ha", parentWin)), $(".aVN:visible .Ha").length > 0) return simulateClick($(".aVN:visible .Ha").last());
                        }, err || (null != result ? result.scheduled : void 0) !== !0) {
                            if (hideNotification(), modifiedSubject = $("input[name='subjectbox']", parentWin).val(), 
                            originalSubject = modifiedSubject.replace(new RegExp(" ?- Scheduled to be sent at.*"), ""), 
                            updateSubject(originalSubject, modifiedSubject, sendLaterButton, function() {}), 
                            isComposeWindow(sendLaterButton) && parentWin.show(), (null != result ? result.scheduled : void 0) !== !0) return modelBox({
                                title: "Right Inbox Error (Err: 061)",
                                message: "Your email cannot be scheduled at the moment. Please try again later.<br /> If you have any questions please <a href='mailto:support@rightinbox.com?subject=About Err 061&body=Hi, I have come across Error 061 while using Right Inbox. Please have a look. Details: " + JSON.stringify(schedulingData) + "'>let us know</a>",
                                button1: {
                                    text: "Close",
                                    color: "white",
                                    focused: !0
                                }
                            }), hideNotification();
                        } else {
                            if (result.archived === !1) return ri.useQuota("numScheduled"), modelBox({
                                title: "Error",
                                message: "Your email is scheduled however, email archiving was unsuccessful. So, your email will be sent automatically according to its schedule, but the conversation is not archived.",
                                button1: {
                                    text: "Close",
                                    color: "white",
                                    focused: !0
                                }
                            }), hideMessageWindow(), hideNotification();
                            if (result.labeled === !1) return ri.useQuota("numScheduled"), modelBox({
                                title: "Error",
                                message: "Your email is scheduled however, the draft message could not be labeled as `Scheduled`.",
                                button1: {
                                    text: "Close",
                                    color: "white",
                                    focused: !0
                                }
                            }), hideMessageWindow(), hideNotification();
                            if (result.scheduled === !0 && (showFinishedNotification("your email has been scheduled"), 
                            refreshInbox(), ri.showPromotion(), ri.useQuota("numScheduled"), hideMessageWindow(), 
                            location.search.indexOf("btop") === -1 && ri.preferences.schedulerReturnBack && !isSplitView() && history.length > 2 && location.href === href && (reminderButton = getReminderButton(buttonId), 
                            !reminderButton.hasClass("T-I-RIo")))) return history.back();
                        }
                    });
                }, unRemindEmail = function(buttonId) {
                    var reminderButton, threadId;
                    if (jsLog.goal("unremembered"), reminderButton = getReminderButton(buttonId), !ri.remindEmailData[reminderButton.selector]) return threadId = getThreadId(9), 
                    requestXMLHttp("unRemindEmail", {
                        threadId: threadId
                    }, function(err, result) {
                        return err || (null != result ? result.unRemembered : void 0) !== !0 ? (enableReminderButtonForThreadId(threadId, buttonId), 
                        (null != result ? result.unRemembered : void 0) !== !0 ? modelBox({
                            title: "Error (067)",
                            message: "Canceling the email reminder was unsuccessful due to some problem. Please try again later.<br /> If you have any questions please <a href='mailto:support@rightinbox.com?subject=About Err 067&body=Hi, I have come across Error 067 while using Right Inbox. Please have a look.'>let us know</a>",
                            button1: {
                                text: "Close",
                                color: "white",
                                focused: !0
                            }
                        }) : void 0) : (ri.freeQuota("numRemembered"), ri.rememberedThreads[getThreadId(10)] = !1, 
                        showFinishedNotification("email reminder is canceled"), refreshInbox());
                    });
                }, remindEmail = function(reminderButton) {
                    var href, numFound;
                    return showInProgressNotification("email reminding"), href = location.href, $.extend(!0, ri.remindEmailData[reminderButton.selector], {
                        returnToInbox: ri.preferences.returnToInbox,
                        star: ri.preferences.star,
                        markAsUnread: ri.preferences.markAsUnread,
                        labelAs: ri.preferences.labelAs,
                        labelAsToBeReminded: ri.preferences.labelAsToBeReminded,
                        ifNoResponse: ri.preferences.ifNoResponse
                    }), isComposeWindow(reminderButton) ? numFound = 1 : (ri.remindEmailData[reminderButton.selector].archiveRemembered = ri.preferences.archiveRemembered, 
                    ri.remindEmailData[reminderButton.selector].ifNoResponse === !0 && (numFound = $(".aHU:visible .Bk").length)), 
                    isConversaionViewModeEnabled() && (ri.remindEmailData[reminderButton.selector].atTheTop = ri.preferences.atTheTop), 
                    ri.remindEmailData[reminderButton.selector] = extendWithComposeHeaders(reminderButton, ri.remindEmailData[reminderButton.selector], {
                        subject: "subject"
                    }), requestXMLHttp("remindEmail", ri.remindEmailData[reminderButton.selector], function(err, result) {
                        var buttonId, handleRememberedThreads, parentWin, ref, threadId;
                        if (err || (null != result ? result.remembered : void 0) !== !0) {
                            if (hideNotification(), ri.freeQuota("numRemembered"), delete ri.remindEmailData[remindEmail.selector], 
                            parentWin = getParentWin(reminderButton), buttonId = reminderButton.attr("id").replace("reminder_", ""), 
                            disableReminderButton(buttonId), (null != result ? result.remembered : void 0) !== !0) return modelBox({
                                title: "Right Inbox Error (Err: 042)",
                                message: "Email reminding was unsuccessful due to some problem. Please try again later.",
                                button1: {
                                    text: "Close",
                                    color: "white",
                                    focused: !0
                                }
                            });
                        } else {
                            if (ri.useQuota("numRemembered"), showFinishedNotification("your email will be reminded"), 
                            ri.showPromotion(), refreshInbox(), location.search.indexOf("btop") === -1 && ri.preferences.reminderReturnBack && !isSplitView() && history.length > 2 && !isComposeWindow(reminderButton) && location.href === href && location.href === href && history.back(), 
                            handleRememberedThreads = function(threadId) {
                                var currentConversationReminderButtonId, ref, ref1;
                                if (ri.rememberedThreads[threadId] = {
                                    date: Math.floor(new Date(ri.remindEmailData[reminderButton.selector].date).getTime() / 1e3)
                                }, ri.remindEmailData[reminderButton.selector].ifNoResponse === !0 && null != numFound && (ri.rememberedThreads[threadId].ifNoResponse = !0, 
                                ri.rememberedThreads[threadId].numFound = numFound), delete ri.remindEmailData[reminderButton.selector], 
                                currentConversationReminderButtonId = null != (ref = $(".ri_rmb").attr("id")) && null != (ref1 = ref.match(/ri_\d+/)) ? ref1[0] : void 0, 
                                currentConversationReminderButtonId === buttonId) return enableReminderButtonForThreadId(threadId, currentConversationReminderButtonId);
                            }, threadId = (null != (ref = ri.remindEmailData[reminderButton.selector]) ? ref.threadId : void 0) || result.threadId) return handleRememberedThreads(threadId);
                            if (result.asyncReq) return requestXMLHttp("asyncReq", {
                                uuid: result.asyncReq
                            }, function(err, data) {
                                if (!err || null != data) return handleRememberedThreads(JSON.parse(data).threadId);
                            });
                        }
                    });
                }, ri.sendButton = function(container) {
                    return ri.findButton(ri.i18n.send, container);
                }, ri.composeButton = function() {
                    return ri.findButton(ri.i18n.compose);
                }, ri.labelsButton = function() {
                    return $(".mw:visible", getCanvasScope());
                }, ri.i18nCheck = function(key, text) {
                    var labels, re;
                    return labels = ri.i18n[key], re = new RegExp("^(" + labels.join("|") + ")$", "i"), 
                    re.test(text);
                }, ri.findButton = function(labels, container) {
                    var buttons, re, scope;
                    return scope = container || getCanvasScope(), re = new RegExp("^(" + labels.join("|") + ")$", "i"), 
                    buttons = $(".J-Zh-I[role='button']", scope).filter(function() {
                        return re.test($(this).text());
                    }), 0 === buttons.length && (buttons = $("[role='button']", scope).filter(function() {
                        return re.test($(this).text());
                    })), buttons;
                }, refreshInbox = function() {
                    return _u.each($(".asf,.nu"), function(refreshButton) {
                        return setTimeout(function() {
                            return simulateClick($(refreshButton));
                        }, 2e3);
                    });
                }, enableImapSetting = function(elementName, value, cb) {
                    var callback, i;
                    return pleaseWait(), callback = function() {
                        return cb(), cb = function() {};
                    }, setTimeout(function() {
                        return callback();
                    }, 1e4), i = setInterval(function() {
                        var imapSetting, k;
                        if ($("input[name='" + elementName + ("'][value='" + value + "']"), getCanvasScope()).length > 0) return clearInterval(i), 
                        imapSetting = $("input[name='" + elementName + "'][value='" + value + "']", getCanvasScope()), 
                        imapSetting.attr("checked") ? callback() : (imapSetting.click(), $(".rU button:eq(0)", getCanvasScope()).attr("disabled", null).click(), 
                        k = setInterval(function() {
                            if (location.href.indexOf("#inbox")) return clearInterval(k), callback();
                        }, 300));
                    }, 100);
                }, ri.disableFolderSizeLimit = function() {
                    var previousHash;
                    return previousHash = location.hash, location.hash = "#settings/fwdandpop", enableImapSetting("ix_ifm", 0, function() {
                        return closeModelBox(), modelBox({
                            title: "IMAP Folder size limit is disabled successfully",
                            message: "You can start scheduling emails to be sent later, and set reminders to email conversations.",
                            button1: {
                                color: "blue"
                            }
                        }), setTimeout(function() {
                            return location.hash = previousHash;
                        }, 2e3);
                    });
                }, window.disableFolderSizeLimit = ri.disableFolderSizeLimit, ri.enableImap = function() {
                    var previousHash;
                    return previousHash = location.hash, location.hash = "#settings/fwdandpop", enableImapSetting("bx_ie", 1, function() {
                        var j;
                        return location.href = "#settings/labels", j = setInterval(function() {
                            var allMailInput, draftInput, trashInput;
                            if (allMailInput = $(".alS:eq(6) input", getCanvasScope()), draftInput = $(".alS:eq(5) input", getCanvasScope()), 
                            trashInput = $(".alS:eq(8) input", getCanvasScope()), allMailInput.length > 0) return clearInterval(j), 
                            allMailInput.attr("checked", null), draftInput.attr("checked", null), trashInput.attr("checked", null), 
                            allMailInput.click(), draftInput.click(), trashInput.click(), location.href = "#inbox", 
                            setTimeout(function() {
                                return authCheck(!1, function() {
                                    return modelBox({
                                        title: "Right Inbox is now ready!",
                                        message: "You may continue your work using Right Inbox.",
                                        button1: {
                                            color: "blue"
                                        }
                                    });
                                });
                            }, 3e3);
                        });
                    });
                }, updateReminderThreadId = function(arg) {
                    var newThreadId, oldThreadId, subject;
                    if (oldThreadId = arg.oldThreadId, newThreadId = arg.newThreadId, subject = arg.subject, 
                    oldThreadId !== newThreadId) return requestXMLHttp("updateReminderThreadId", {
                        oldThreadId: oldThreadId,
                        newThreadId: newThreadId,
                        subject: subject
                    }, function(err, result) {
                        if (!err) return ri.rememberedThreads[newThreadId || result.newThreadId] = ri.rememberedThreads[oldThreadId], 
                        delete ri.rememberedThreads[oldThreadId];
                    });
                }, enableReminderButtonForThreadId = function(threadId, buttonId, cb) {
                    var checkIfResponseReceivedAndEnableReminderButton, ref, ref1, ref2;
                    return null == cb && (cb = function() {}), checkIfResponseReceivedAndEnableReminderButton = function() {
                        var rememberedDate;
                        return ri.rememberedThreads[threadId].ifNoResponse === !0 && ri.rememberedThreads[threadId].numFound < $(".aHU:visible .Bk").length ? ri.rememberedThreads[threadId].ifNoResponse === !0 ? (isSplitView() || $('.hN[name="To Be Reminded"]').closest(".hR").hide(), 
                        cb(!1)) : void 0 : (rememberedDate = new Date(1e3 * ri.rememberedThreads[threadId].date), 
                        rememberedDate - new Date() > -6e4 ? (enableReminderButton(rememberedDate, buttonId), 
                        cb(!0)) : cb(!1));
                    }, ri.rememberedThreads && null == (null != (ref = ri.rememberedThreads) ? ref[threadId] : void 0) && !(null != (ref1 = ri.rememberedThreads) ? ref1.localcache : void 0) ? requestXMLHttp("checkRememberedEmail", {
                        threadId: threadId
                    }, function(err, result) {
                        var ref2;
                        if (!err) return result.remembered ? (ri.rememberedThreads[threadId] = {
                            date: Math.floor(new Date(result.date).getTime() / 1e3)
                        }, result.ifNoResponse && (ri.rememberedThreads[threadId].ifNoResponse = result.ifNoResponse), 
                        result.numFound && (ri.rememberedThreads[threadId].numFound = result.numFound), 
                        checkIfResponseReceivedAndEnableReminderButton()) : (null != (ref2 = ri.rememberedThreads) && (ref2[threadId] = !1), 
                        disableReminderButton(buttonId), cb(!1));
                    }) : (null != (ref2 = ri.rememberedThreads) ? ref2[threadId] : void 0) ? checkIfResponseReceivedAndEnableReminderButton() : (disableReminderButton(buttonId), 
                    cb(!1));
                }, placeRemindMeButton = function(opts) {
                    var defaults, intervalTimes, placeRemindMeButtonRand;
                    if (null == opts && (opts = {}), placeRemindMeButtonRand = _u.random(0, 1e3), defaults = {
                        className: "ri_rmb"
                    }, !ri.interval.placeRemindMeButton) return intervalTimes = 0, ri.interval.placeRemindMeButton = setInterval(function() {
                        var buttonExists, buttonId, labelsButton, orgThreadId, ref, ref1, reminderButton, splitViewPlaceRemindMeButtonFirstRun, threadId;
                        if (intervalTimes++, labelsButton = ri.labelsButton(), buttonExists = 0 !== $("." + defaults.className + ":visible", getCanvasScope()).length, 
                        isInsideEmail() && !buttonExists && ($("." + defaults.className, getCanvasScope()).remove(), 
                        buttonId = randomId(), uiButton({
                            id: "add_note_pref_" + buttonId,
                            className: defaults.className,
                            text: " ",
                            tip: "Preferences for notes",
                            insertAfter: $(labelsButton),
                            combobox: !0,
                            action: function() {
                                return addNotePrefs(buttonId);
                            }
                        }), uiButton({
                            id: "add_note_" + buttonId,
                            className: defaults.className,
                            text: "Add Note",
                            tip: "Add a note to this conversation",
                            insertAfter: $(labelsButton),
                            checkbox: !0,
                            action: function() {
                                return toggleAddNote(buttonId);
                            }
                        }), uiButton({
                            id: "reminder_pref_" + buttonId,
                            className: defaults.className,
                            text: " ",
                            tip: "Preferences for reminder",
                            insertAfter: $(labelsButton),
                            combobox: !0,
                            action: function() {
                                return emailReminderPrefs(buttonId);
                            }
                        }), uiButton({
                            id: "reminder_" + buttonId,
                            className: defaults.className,
                            text: "Remind Me",
                            tip: "Reminder settings for this conversation",
                            insertAfter: $(labelsButton),
                            checkbox: !0,
                            action: function() {
                                return toggleReminder(buttonId);
                            }
                        }), ri.monthlyQuota && (isSplitView() ? (orgThreadId = getThreadIdLastInConversation(), 
                        ri.interval.splitViewPlaceRemindMeButton && clearInterval(ri.interval.splitViewPlaceRemindMeButton), 
                        splitViewPlaceRemindMeButtonFirstRun = !0, ri.interval.splitViewPlaceRemindMeButton = setInterval(function() {
                            var newButtonId, threadId;
                            if (threadId = getThreadIdLastInConversation(), threadId && (orgThreadId !== threadId || splitViewPlaceRemindMeButtonFirstRun)) return splitViewPlaceRemindMeButtonFirstRun = !1, 
                            orgThreadId = threadId, newButtonId = randomId(), getReminderButton(buttonId).attr("data-threadid", threadId), 
                            getReminderButton(buttonId).attr("id", "reminder_" + newButtonId), getReminderPrefButton(buttonId).attr("id", "reminder_pref_" + newButtonId), 
                            $(getCanvasScope()).delegate("#reminder_" + newButtonId, "click", function() {
                                return toggleReminder(newButtonId);
                            }), $(getCanvasScope()).delegate("#reminder_pref_" + newButtonId, "click", function() {
                                return emailReminderPrefs(newButtonId);
                            }), enableReminderButtonForThreadId(getThreadId(13), newButtonId), getAddNoteButton(buttonId).attr("data-threadid", threadId), 
                            getAddNoteButton(buttonId).attr("id", "add_note_" + newButtonId), getAddNotePrefButton(buttonId).attr("id", "add_note_pref_" + newButtonId), 
                            $(getCanvasScope()).delegate("#add_note_" + newButtonId, "click", function() {
                                return toggleAddNote(newButtonId);
                            }), $(getCanvasScope()).delegate("#add_note_pref_" + newButtonId, "click", function() {
                                return addNotePrefs(newButtonId);
                            }), enableAddNoteButtonForThreadId(getThreadId(14), newButtonId), buttonId = newButtonId, 
                            setTimeout(function() {
                                var ref, ref1, reminderButton;
                                if (!(null != (ref = ri.notedThreads) ? ref[threadId] : void 0) && (null != (ref1 = ri.rememberedThreads) ? ref1[threadId] : void 0) && (reminderButton = getReminderButton(buttonId), 
                                reminderButton.hasClass("T-I-RIo"))) return showTooltip(reminderButton);
                            }, 500);
                        }, 300)) : (threadId = getThreadId(15), threadId && (enableReminderButtonForThreadId(threadId, buttonId), 
                        enableAddNoteButtonForThreadId(threadId, buttonId), getReminderButton(buttonId).attr("data-threadid", threadId), 
                        getAddNoteButton(buttonId).attr("data-threadid", threadId), !(null != (ref = ri.notedThreads) ? ref[threadId] : void 0) && (null != (ref1 = ri.rememberedThreads) ? ref1[threadId] : void 0) && (reminderButton = getReminderButton(buttonId), 
                        reminderButton.hasClass("T-I-RIo") && showTooltip(reminderButton))))), clearInterval(ri.interval.placeRemindMeButton), 
                        ri.interval.placeRemindMeButton = null), intervalTimes > 10 && isSplitView() === !1) return clearInterval(ri.interval.placeRemindMeButton), 
                        ri.interval.placeRemindMeButton = null;
                    }, 307);
                }, clearScheduledRecurringLabels = function(clearSubject) {
                    return requestXMLHttp("clearScheduledRecurringLabels", {
                        clearSubject: clearSubject
                    }, function(err, result) {});
                }, replaceSendNowButton = function(button, label) {
                    var parentWin, sendButton;
                    if (parentWin = getParentWin(button), 0 === parentWin.find(".ri_snb").length) return sendButton = ri.sendButton(parentWin), 
                    sendButton.hide(), uiButton({
                        text: "Send Now",
                        className: "ri_snb aoO",
                        width: 12,
                        insertAfter: sendButton,
                        color: "blue",
                        action: function() {
                            return modelBox({
                                title: "Warning",
                                message: "This is a " + label + ", if you choose to send this email now, scheduled delivery will be canceled",
                                button2: {
                                    enabled: !0,
                                    text: "Send Now",
                                    color: "blue",
                                    width: 12,
                                    action: function() {
                                        var addNoteButton, buttonId, clearSubject, modifiedSubject, oldThreadId, reminderButton, shouldUpdateNoteThreadId, shouldUpdateReminderThreadId;
                                        return showInProgressNotification("sending email"), parentWin = getParentWin(button), 
                                        parentWin.hide(), closeModelBox(), modifiedSubject = $("input[name='subjectbox']", parentWin).val(), 
                                        clearSubject = modifiedSubject.replace(new RegExp(" ?- Recurring email repeats.*"), "").replace(new RegExp(" ?- Scheduled to be sent at.*"), ""), 
                                        oldThreadId = getDraftThreadId(button), buttonId = button.attr("id").match(/ri_\d+/)[0], 
                                        addNoteButton = getAddNoteButton(buttonId), shouldUpdateNoteThreadId = addNoteButton.hasClass("T-I-RIy"), 
                                        reminderButton = getReminderButton(buttonId), shouldUpdateReminderThreadId = reminderButton.hasClass("T-I-RIo"), 
                                        ri.interval.composeWindowEditWatch[buttonId] && clearInterval(ri.interval.composeWindowEditWatch[buttonId]), 
                                        delete ri.interval.composeWindowEditWatch[buttonId], updateSubject(clearSubject, modifiedSubject, button, function() {
                                            var newThreadId;
                                            return newThreadId = getDraftThreadId(addNoteButton), checkSentNotificationMessage("clearScheduledRecurringLabels", function() {
                                                return clearScheduledRecurringLabels(clearSubject), shouldUpdateNoteThreadId && updateNoteThreadId({
                                                    oldThreadId: oldThreadId,
                                                    subject: clearSubject
                                                }), shouldUpdateReminderThreadId && updateReminderThreadId({
                                                    oldThreadId: oldThreadId,
                                                    subject: clearSubject
                                                }), refreshInbox();
                                            }, addNoteButton), sendButton.click();
                                        });
                                    }
                                },
                                button1: {
                                    text: "Cancel",
                                    enabled: !0
                                }
                            });
                        }
                    });
                }, replaceSubjectBox = function(parentWin) {
                    var clearSubject, matches, replacementBox, subjectBox, suffix;
                    if (replacementBox = $("input[name='replacementBox']", parentWin), 0 === replacementBox.length) return subjectBox = $("input[name='subjectbox']", parentWin), 
                    matches = subjectBox.val().match(new RegExp("(?: - )(?:Scheduled to be sent at|Recurring email repeats).+")), 
                    clearSubject = subjectBox.val().replace(new RegExp(" - Scheduled to be sent at.+"), "").replace(new RegExp(" - Recurring email repeats.+"), ""), 
                    replacementBox = $("<input name='replacementBox' class='aoT' spellcheck='true' tabindex='1' placeholder='Subject' aria-label='Subject' value='" + _u.escape(clearSubject) + "'>"), 
                    subjectBox.before(replacementBox).hide(), subjectBox.attr("tabindex", "-1"), (null != matches ? matches[0] : void 0) ? suffix = matches[0] : (replacementBox.attr("id", subjectBox.attr("id")), 
                    suffix = ""), replacementBox.bind("keyup paste", function() {
                        if (subjectBox.val($(this).val() + suffix), "" !== suffix) return simulateKeydown(getEditable(parentWin));
                    });
                }, placeDisabledUserAction = function() {
                    if (0 === $(".ri_activate_disabled_user").length) return getGmailUser(function(gmailUser) {
                        var placeAction;
                        return (placeAction = function(pageLoaded) {
                            var activator, container;
                            return null == pageLoaded && (pageLoaded = !1), container = $("#gbwa,.gb_kb").first().parent(), 
                            1 === container.length ? (activator = $('<div class="gb_zd" style="margin-right: 10px;"><a class="ri_activate_disabled_user gb_P gb_R" href="#" data-tooltip="Right Inbox is an extension that allows you to schedule emails to send later, set email reminders, create recurring emails and add private notes to emails" data-tooltip-delay="600" style="cursor: pointer;">Activate Right Inbox</a></div>'), 
                            activator.insertBefore(container), activator.click(function() {
                                return delLocalPrefs("disabledUsers", gmailUser), $(".ri_activate_disabled_user").remove(), 
                                init(), jsLog.info({
                                    type: "Inf403",
                                    action: "activateForUser",
                                    user: gmailUser
                                });
                            })) : pageLoaded === !1 ? whenGmailUILoaded(function() {
                                return placeAction(!0);
                            }) : jsLog.error({
                                type: "Err048",
                                user: gmailUser,
                                numContainer: container.length
                            });
                        })();
                    });
                }, placeButtons = function(opts) {
                    var defaults;
                    if (null == opts && (opts = {}), defaults = {
                        className: "ri_slb"
                    }, $.extend(!0, defaults, opts), !ri.interval.placeButtons) return ri.interval.placeButtons = setInterval(function() {
                        var addNoteButton, buttonId, container, enableComposeWindowEditWatch, item, recurringEmailId, reminderButton, rid, scheduledEmailDetails, sendButton, threadId;
                        if (container = $(".dW.E:not(.ri_buttonAdded),.aDj:not(.ri_buttonAdded)"), container.length > 0) return placeRemindMeButton(), 
                        container.addClass("ri_buttonAdded"), sendButton = ri.sendButton(container), sendButton.text().toLowerCase().indexOf("send") !== -1 && sendButton.css("width", "12ex").text("Send Now").css("text-transform", "capitalize"), 
                        rid = randomId(), $("<div class='ri_buttonsrow'><span id='" + rid + "'></span></div>").insertAfter(sendButton.closest(".aDh")), 
                        item = $("#" + rid), isReplyScreen(item) && item.closest(".aoI").append("<div>&nbsp</div><div>&nbsp</div><div>&nbsp</div>"), 
                        buttonId = randomId(), uiButton({
                            id: "recurring_pref_" + buttonId,
                            className: defaults.className,
                            text: " ",
                            tip: "Preferences for recurring email",
                            insertAfter: $(item),
                            combobox: !0,
                            action: function() {
                                return recurringPrefs(buttonId);
                            }
                        }), recurringEmailId = getRecurringEmailId(sendButton), uiButton({
                            id: "recurring_" + buttonId,
                            className: defaults.className,
                            text: "Recurring",
                            insertAfter: $(item),
                            checkbox: !!recurringEmailId,
                            action: function() {
                                return toggleRecurring(buttonId);
                            }
                        }), recurringEmailId && requestXMLHttp("checkRecurringEmail", {
                            recurringEmailId: recurringEmailId
                        }, function(err, recurringEmailData) {
                            if (!err && !_u.isEmpty(recurringEmailData)) return ri.recurringEmailsData[recurringEmailId] = recurringEmailData, 
                            enableRecurringButton(recurringEmailData, buttonId);
                        }), uiButton({
                            id: "add_note_pref_" + buttonId,
                            className: defaults.className,
                            text: " ",
                            tip: "Preferences for notes",
                            insertAfter: $(item),
                            combobox: !0,
                            action: function() {
                                return addNotePrefs(buttonId);
                            }
                        }), uiButton({
                            id: "add_note_" + buttonId,
                            className: defaults.className,
                            text: "Add Note",
                            tip: "Add a note to this conversation",
                            insertAfter: $(item),
                            checkbox: !0,
                            action: function() {
                                return toggleAddNote(buttonId);
                            }
                        }), uiButton({
                            id: "reminder_pref_" + buttonId,
                            className: defaults.className,
                            text: " ",
                            tip: "Preferences for reminder",
                            insertAfter: $(item),
                            combobox: !0,
                            action: function() {
                                return emailReminderPrefs(buttonId);
                            }
                        }), uiButton({
                            id: "reminder_" + buttonId,
                            className: defaults.className,
                            text: "Remind Me",
                            insertAfter: $(item),
                            checkbox: !0,
                            action: function() {
                                return toggleReminder(buttonId);
                            }
                        }), uiButton({
                            id: "send_later_pref_" + buttonId,
                            className: defaults.className,
                            text: " ",
                            tip: "Preferences for email scheduling",
                            color: defaults.color,
                            insertAfter: $(item),
                            combobox: !0,
                            action: function() {
                                return sendLaterPrefs(buttonId);
                            }
                        }), scheduledEmailDetails = getScheduledEmailDetails(sendButton), uiButton({
                            id: "send_later_" + buttonId,
                            className: defaults.className,
                            text: "Send Later",
                            color: defaults.color,
                            width: 12,
                            insertAfter: $(item),
                            checkbox: !!scheduledEmailDetails,
                            action: function() {
                                return toggleSendLater(buttonId);
                            }
                        }), scheduledEmailDetails && enableSendLaterButton(scheduledEmailDetails, buttonId), 
                        reminderButton = getReminderButton(buttonId), addNoteButton = getAddNoteButton(buttonId), 
                        enableComposeWindowEditWatch = function() {
                            var i, j, oldThreadId, parentWin;
                            if (isComposeWindow(addNoteButton) && (oldThreadId = getDraftThreadId(addNoteButton), 
                            !ri.interval.composeWindowEditWatch[buttonId])) return i = null, parentWin = getParentWin(addNoteButton), 
                            j = setInterval(function() {
                                if (0 === getAddNoteButton(buttonId).length) return clearInterval(j), i && clearInterval(i), 
                                ri.interval.composeWindowEditWatch[buttonId] && clearInterval(ri.interval.composeWindowEditWatch[buttonId]), 
                                delete ri.interval.composeWindowEditWatch[buttonId];
                            }, 2e3), ri.interval.composeWindowEditWatch[buttonId] = setInterval(function() {
                                var newThreadId;
                                if (ri.i18nCheck("saved", $(".oG:last", parentWin).text())) return clearInterval(ri.interval.composeWindowEditWatch[buttonId]), 
                                delete ri.interval.composeWindowEditWatch[buttonId], newThreadId = getDraftThreadId(addNoteButton), 
                                addNoteButton.hasClass("T-I-RIy") && updateNoteThreadId({
                                    oldThreadId: oldThreadId,
                                    newThreadId: newThreadId
                                }), reminderButton.hasClass("T-I-RIo") && updateReminderThreadId({
                                    oldThreadId: oldThreadId,
                                    newThreadId: newThreadId
                                }), oldThreadId = newThreadId, i = setInterval(function() {
                                    if (!ri.i18nCheck("saved", $(".oG:last", parentWin).text())) return clearInterval(i), 
                                    enableComposeWindowEditWatch();
                                }, 200);
                            }, 200);
                        }, isComposeWindow(reminderButton) ? threadId = getDraftThreadId(reminderButton) : (threadId = getThreadId(16), 
                        getReminderButton(buttonId).attr("data-threadid", threadId), getAddNoteButton(buttonId).attr("data-threadid", threadId)), 
                        enableReminderButtonForThreadId(threadId, buttonId, function(isEnabled) {
                            if (isEnabled) return enableComposeWindowEditWatch();
                        }), enableAddNoteButtonForThreadId(threadId, buttonId, function(isEnabled) {
                            if (isEnabled) return enableComposeWindowEditWatch();
                        });
                    }, 200);
                }, getScheduledEmailDetails = function(button) {
                    var matches, parentWin, regex;
                    return parentWin = getParentWin(button), regex = new RegExp("Scheduled to be sent at *([^#]+)(#.+)?"), 
                    matches = regex.exec($("input[name='subjectbox']", parentWin).val()), null != matches ? matches[1] : void 0;
                }, getRecurringEmailId = function(button) {
                    var matches, parentWin, regex;
                    return parentWin = getParentWin(button), regex = new RegExp("Recurring email repeats.*#(........-....-4...-....-............)"), 
                    matches = regex.exec($("input[name='subjectbox']", parentWin).val()), null != matches ? matches[1] : void 0;
                }, getDraftThreadId = function(button) {
                    var threadId;
                    if (threadId = getParentWin(button).find("input[name='draft']").val(), "undefined" !== threadId) return threadId;
                }, getThreadId = function(requestNo) {
                    var firstThread, firstThreadId, firstThreadWasCollapsed, iigtClass, iigtContenteditable, iigtOffset, iigtThreadId, iigtVisible, iigtVisibleClass, ref, ref1, ref2, ref3, ref4, threadId;
                    return threadId = null != (ref = /[0-9A-Za-z]{16}/.exec(location.hash.split("/").pop().replace(/#/, "").split("?")[0])) ? ref[0] : void 0, 
                    threadId || (isSplitView() ? (firstThread = $(".adf.ads:visible,.adn.ads:visible").first(), 
                    firstThreadWasCollapsed = firstThread.hasClass("adf"), firstThreadWasCollapsed && firstThread.click(), 
                    firstThreadId = null != (ref1 = /[0-9A-Za-z]{16}\b/.exec($(".adP.adO:visible>div:first").attr("class"))) ? ref1[0] : void 0, 
                    firstThreadWasCollapsed && ($(".adn.ads:visible .acZ:first").click(), $(".adn.ads:visible .acZ:last").click()), 
                    firstThreadId || (iigtVisible = $(".ii.gt .a3s.aXjCH:visible>div").first(), iigtThreadId = null != (ref2 = /[0-9A-Za-z]{16}\b/.exec(iigtVisible.attr("class"))) ? ref2[0] : void 0, 
                    iigtThreadId || (iigtClass = [], iigtContenteditable = [], iigtOffset = [], iigtVisible = [], 
                    iigtVisibleClass = [], $(".ii.gt").map(function(index, item) {
                        if (iigtClass.push($(item).find(">div").attr("class")), item.getAttribute("contenteditable") && iigtContenteditable.push(1), 
                        item.offsetWidth > 0 && item.offsetHeight > 0 && iigtOffset.push(1), $(item).is(":visible")) return iigtVisibleClass.push($(item).attr("class"));
                    }), jsLog.error({
                        type: "Err034",
                        requestNo: requestNo,
                        isSplitView: isSplitView(),
                        isInsideEmail: isInsideEmail(),
                        threadIdLastInConversation: getThreadIdLastInConversation(),
                        firstThread: null != firstThread ? firstThread.length : void 0,
                        firstThreadWasCollapsed: firstThreadWasCollapsed,
                        gs: $(".gs").length,
                        iigt: $(".ii.gt").length,
                        iigtVisible: $(".ii.gt:visible").length,
                        h7: $(".h7").length,
                        h7Visible: $(".h7:visible").length,
                        kv: $(".kv").length,
                        kvgs: $(".kv .gs").length,
                        kvgsVisible: $(".kv:visible .gs").length,
                        kQ: $(".kQ").length,
                        iigtClass: iigtClass,
                        iigtContenteditable: iigtContenteditable,
                        iigtOffset: iigtOffset,
                        iigtVisibleClass: iigtVisibleClass,
                        version: ri.cliVersion,
                        firstThreadSearch: $(".adP.adO:visible:first").length,
                        firstThreadSearchClass: $(".adP.adO:visible:first").attr("class")
                    })))) : "#sent" === location.hash ? (iigtVisible = $(".ii.gt:visible>div").first(), 
                    iigtThreadId = null != (ref3 = /[0-9A-Za-z]{16}\b/.exec(iigtVisible.attr("class"))) ? ref3[0] : void 0) : threadId = null != (ref4 = /[0-9A-Za-z]{16}/.exec(location.hash)) ? ref4[0] : void 0), 
                    threadId || firstThreadId || iigtThreadId;
                }, getThreadIdLastInConversation = function() {
                    var ref;
                    return null != (ref = /[0-9A-Za-z]{16}\b/.exec($(".adP.adO:visible:last>div").attr("class"))) ? ref[0] : void 0;
                }, getCanvasScope = function() {
                    var a, b;
                    return b = document.getElementById("canvas_frame"), b ? (a = b.contentWindow || b.contentDocument, 
                    a.document && (a = a.document), a) : document;
                }, getGmailUser = function(callback) {
                    var gmailUser, re;
                    return re = /[a-zA-Z0-9\._-]+@[a-zA-Z0-9\.-]+\.[a-z\.A-Z]+/g, gmailUser = _u.first(re.exec($(".msg").html())), 
                    gmailUser || (gmailUser = _u.last(document.title.match(re))), gmailUser ? callback(gmailUser) : $(window).one("load", function() {
                        return callback(_u.last(document.title.match(re)));
                    });
                }, window.closeModelBox = ri.closeModelBox = function() {
                    return $(".Kj-JD-Jh, .Kj-JD").remove();
                }, uiButton = function(opts) {
                    var button, color_id, defaults, ref;
                    switch (null == opts && (opts = {}), defaults = {
                        id: randomId(),
                        text: "",
                        color: "white",
                        action: null,
                        insertAfter: null,
                        width: null,
                        className: "",
                        checkbox: !1,
                        combobox: !1,
                        tip: "",
                        noDelegate: !1
                    }, $.extend(!0, defaults, opts), defaults.color) {
                      case "white":
                        color_id = "ax7";
                        break;

                      case "red":
                        color_id = "KE";
                        break;

                      case "blue":
                        color_id = "atl";
                    }
                    return defaults.checkbox ? $("<div id='" + defaults.id + "' class='T-I J-J5-Ji T-Pm T-I-ax7 L3 J-JN-M-I G-as3 " + defaults.className + " ri_button_align' role='button' style='-webkit-user-select: none;' data-tooltip-delay='600' data-tooltip='" + defaults.tip + "'> <div class='J-J5-Ji J-JN-M-I-Jm'> <span class='T-Jo J-J5-Ji T-Jo-auq T-Jo-iAfbIe' role='checkbox' style='-webkit-user-select: none; ' dir='ltr'> <div class='T-Jo-auh'></div> </span> </div> <div class='J-J5-Ji J-JN-M-I-JG ri-label'>" + defaults.text + "</div> </div>").insertAfter(defaults.insertAfter) : (button = $("<div id='" + defaults.id + "' class='J-J5-Ji Bq L3 T-I T-I-" + color_id + " " + defaults.className + " ri_button_align' data-tooltip='" + defaults.tip + "' data-tooltip-delay='600' role='button' style='" + (defaults.combobox ? "rtl" === $("body").attr("dir") ? "padding: 0 3px 0 6px;margin-right: -18px;min-width:0;" : "padding: 0 6px 0 3px;margin-left: -18px;min-width:0;" : "") + (defaults.width ? "width: " + defaults.width + "ex;" : "") + "-webkit-user-select: none;'>" + defaults.text + " " + (defaults.combobox ? '<div class="G-asx J-J5-Ji">&nbsp;</div>' : "") + "</div>").insertAfter(defaults.insertAfter), 
                    0 < (ref = button.closest(".aDj").width()) && ref < 510 && " " === defaults.text && ("rtl" === $("body").attr("dir") ? button.addClass("ri_tight_left_margin") : button.addClass("ri_tight_right_margin"))), 
                    $("#" + defaults.id, getCanvasScope()).hover(function() {
                        return $(this).toggleClass("T-I-JW");
                    }), defaults.noDelegate ? $("#" + defaults.id).click(function() {
                        return defaults.action();
                    }) : $(getCanvasScope()).delegate("#" + defaults.id, "click", function() {
                        return defaults.action();
                    });
                }, checkboxStatus = function(itemId, prefId, status, prefButtonId) {
                    switch (jsLog.goal("pref_modified"), status) {
                      case !0:
                        return $("#" + itemId, getCanvasScope()).addClass("J-Ks-KO J-LC-JR-Jp"), ri.preferences[prefId] = !0;

                      case !1:
                        return $("#" + itemId, getCanvasScope()).removeClass("J-Ks-KO J-LC-JR-Jp"), ri.preferences[prefId] = !1;

                      case "toggle":
                        return checkboxStatus(itemId, prefId, !ri.preferences[prefId], prefButtonId);
                    }
                }, uiMenu = function(opts) {
                    var action, args, defaults, itemActions, itemId, l, len, menu, offset, parts, ref, results, top, type;
                    if (null == opts && (opts = {}), defaults = {
                        id: null,
                        parts: null,
                        clickOutButton: null
                    }, $.extend(!0, defaults, opts), $("#" + defaults.id, getCanvasScope()).length > 0) return void $("#" + defaults.id, getCanvasScope()).remove();
                    for (itemActions = [], this.item = function(arg) {
                        var action, item, itemId, tooltip;
                        return item = arg[0], action = arg[1], tooltip = arg[2], itemId = randomId(), itemActions.push([ itemId, action ]), 
                        "<div class='J-N J-Ks' id='" + itemId + "' " + (tooltip ? "data-tooltip='" + tooltip + "' data-tooltip-delay='1000'" : void 0) + " role='menuitem' style='-webkit-user-select: none;'>" + item + "</div>";
                    }, this.label = function(arg) {
                        var label, tooltip;
                        return label = arg[0], tooltip = arg[1], "<div " + (tooltip ? "data-tooltip='" + tooltip + "' data-tooltip-delay='800'" : void 0) + " class='J-awr' style='-webkit-user-select: none; '>" + label + "</div>";
                    }, this.seperator = function() {
                        return "<div class='J-Kh' style='-webkit-user-select: none; ' role='separator'></div>";
                    }, this.checkbox = function(arg) {
                        var item, itemId, prefId, tooltip;
                        return item = arg[0], prefId = arg[1], tooltip = arg[2], itemId = randomId(), itemActions.push([ itemId, function() {
                            return checkboxStatus(itemId, prefId, "toggle", defaults.clickOutButton.attr("id"));
                        } ]), "<div id='" + itemId + "' " + (tooltip ? "data-tooltip='" + tooltip + "' data-tooltip-delay='800'" : void 0) + " class='J-LC-CHE J-LC J-N J-Ks " + (ri.preferences[prefId] ? "J-LC-CHE J-Ks-KO J-LC-JR-Jp" : "") + "' role='menuitem' style='-webkit-user-select: none;background-position-x: 5px;' title=''><div class='J-LC-CHE J-LC-Jz' style='-webkit-user-select: none;'><div class='J-LC-CHE J-LC-Jo J-J5-Ji' style='-webkit-user-select: none; '></div>" + item + "</div></div>";
                    }, parts = function() {
                        var l, len, ref, ref1, results;
                        for (ref = defaults.parts, results = [], l = 0, len = ref.length; l < len; l++) ref1 = ref[l], 
                        type = ref1[0], args = 2 <= ref1.length ? slice.call(ref1, 1) : [], results.push(this[type](args));
                        return results;
                    }.call(this), menu = $("<div id='" + defaults.id + "' class='J-M asi jQjAxd' style='-webkit-user-select: none; left: visibility: visible;' role='menu' aria-haspopup='true' aria-activedescendant=''> <div class='ri_uimenu SK AX' style='-webkit-user-select: none; '> " + parts.join("") + " </div> </div>"), 
                    menu.appendTo($("body", getCanvasScope())), offset = defaults.clickOutButton.offset(), 
                    offset.top += 29, menu.width() + offset.left + 10 > window.innerWidth && (offset.left = window.innerWidth - menu.width() - 10), 
                    menu.offset(offset), getParentWin(defaults.clickOutButton).length > 0 && (top = defaults.clickOutButton.offset().top - menu.height() - 14, 
                    menu.css("top", top + "px")), menu.find(".J-N.J-Ks").hover(function() {
                        return $(this).toggleClass("J-N-JT");
                    }), $("body", getCanvasScope()).on("mousedown.uimenu", function(e) {
                        if ($(e.target).attr("id") !== defaults.clickOutButton.attr("id") && $(e.target).parent().attr("id") !== defaults.clickOutButton.attr("id") && !$(e.target).hasClass("J-LC-CHE") && !$(e.target).hasClass("ri_gray_label")) return $("#" + defaults.id, getCanvasScope()).remove(), 
                        $("body", getCanvasScope()).off("mousedown.uimenu");
                    }), results = [], l = 0, len = itemActions.length; l < len; l++) ref = itemActions[l], 
                    itemId = ref[0], action = ref[1], results.push($("#" + itemId, getCanvasScope()).mousedown(action));
                    return results;
                }, modelBox = function(opts) {
                    var defaults;
                    return null == opts && (opts = {}), closeModelBox(), defaults = {
                        title: "",
                        messsage: "",
                        button1: {
                            enabled: !0,
                            text: "OK",
                            action: closeModelBox,
                            color: "white",
                            focused: !1,
                            disableOnClick: !1
                        },
                        button2: {
                            enabled: !1,
                            text: null,
                            action: closeModelBox,
                            color: "blue",
                            focused: !1,
                            disableOnClick: !1
                        },
                        closeEnabled: !0,
                        type: "normal",
                        closeAction: function() {
                            return closeModelBox();
                        }
                    }, $.extend(!0, defaults, opts), whenGmailUILoaded(function() {
                        if ($(".Kj-JD").hide(), $("<div class='Kj-JD-Jh' style='opacity: 0.75; width: 2560px; height: 2560px;'></div> <div class='Kj-JD " + ("wide" === defaults.type ? "ri_modelbox_wide" : "") + "' tabindex='0' style='left: 50%; top: 40%; width:460px; overflow:visible; ' role='dialog' aria-labelledby=':1cz'> <div class='Kj-JD-K7 Kj-JD-K7-GIHV4' id=':1cz'> <span class='Kj-JD-K7-K0'> " + defaults.title + " </span> " + (defaults.closeEnabled ? "<span class='Kj-JD-K7-Jq ri_closemodelbox'></span>" : "") + " </div> <div class='Kj-JD-Jz'> " + defaults.message + " </div> <div class='Kj-JD-Jl'> " + (defaults.button2.enabled ? "<button id='ri_b2' class='" + ("white" === defaults.button2.color ? "J-at1-auR" : "J-at1-atl") + "'> " + defaults.button2.text + " </button>" : "") + " " + (defaults.button1.enabled ? "<button id='ri_b1' class='" + ("white" === defaults.button1.color ? "J-at1-auR" : "J-at1-atl") + "'> " + defaults.button1.text + " </button>" : "") + " </div> </div>").appendTo($("body", getCanvasScope())), 
                        $(".Kj-JD-Jh, .Kj-JD").css("margin-left", $(".Kj-JD").width() / 2 * -1).css("margin-top", $(".Kj-JD").height() / 2 * -1).show(), 
                        $(".ri_closemodelbox").click(defaults.closeAction), $("#ri_b1").click(function() {
                            if (defaults.button1.action(), defaults.button1.disableOnClick) return $("#ri_b1").attr("disabled", !0), 
                            $("#ri_b1").text("Please wait...");
                        }), $("#ri_b2").click(function() {
                            if (defaults.button2.action(), defaults.button2.disableOnClick) return $("#ri_b2").attr("disabled", !0), 
                            $("#ri_b2").text("Please wait...");
                        }), defaults.button1.focused && $("#ri_b1").focus(), defaults.button2.focused) return $("#ri_b2").focus();
                    });
                }, showTooltip = function(element, tooltip) {
                    if (element.length > 0) return tooltip || (tooltip = element.attr("data-tooltip")), 
                    element.attr("data-tooltip", tooltip), simulateMouseover(element);
                }, ri.showPricingPromotion = function() {
                    var now, ref, twoWeeksAgo;
                    if (twoWeeksAgo = new Date().getTime() - 12096e5, now = new Date().getTime(), (null != (ref = ri.preferences) ? ref.lastPromoted : void 0) && ri.preferences.lastPromoted < twoWeeksAgo && ("" === getLocalPrefs("lastPromoted") || getLocalPrefs("lastPromoted") < twoWeeksAgo)) return ri.preferences.lastPromoted = now, 
                    setLocalPrefs("lastPromoted", now), ri.showPricingTable();
                }, ri.showPromotion = function() {
                    return setTimeout(function() {
                        return Math.random() > .9 ? ri.showReferralTable() : Math.random() > .8 ? ri.showRatingTable() : void 0;
                    }, 3e3);
                }, ri.showReferralTable = function() {
                    var promoMessage, promoMessages, ref, ref1, referralTable;
                    return "unlimited" === ri.monthlyQuota || (null != (ref = ri.preferences) ? ref.hasReferred : void 0) === !0 || (null != (ref1 = ri.preferences) ? ref1.hasReferred : void 0) > 2 ? void closeModelBox() : (promoMessages = [ ".@RightInbox schedules your emails in #Gmail to be sent later. Try", "Email scheduling in #Gmail with @RightInbox. Check out", "You can set a future send date for your emails with @RightInbox. Try out", "Do you prefer your emails to be sent first thing in the morning? Check out", "Schedule Emails in #Gmail To Be Sent Later. Check out", "Have good ideas at night but wanna send the email later in the morning? Then schedule it with @RightInbox. Try", "Add reminders to conversations in #Gmail with @RightInbox. Give it a try!", "Email reminders in #Gmail with @RightInbox. Wonderful! See", "An excellent tool for follow ups and a cleaner inbox. Try", "Keep your inbox clean with @RightInbox. Check out", "Boost your productivity with @RightInbox. Great productivity tool for #Gmail. Check out", "Schedule recurring emails in #Gmail easily with @RightInbox. Try out", "Manage your periodic tasks with recurring email reminders. See", ".@RightInbox is a powerful tool for #Gmail to ease your periodic tasks with recurring emails. Check out", "Save yourself some time, create recurring emails, escape from periodic tasks. Great tool for #Gmail", "Take back #email power with @RightInbox. Using it. Love it. Check out", "Manage your inbox better with @RightInbox. See", "Ever come up with good ideas at night but want to send the email in the morning? You need @RightInbox. Try", "I just signed up for @RightInbox, a free product that makes email communication a lot more easier. Check", "Incredible productivity tool for #Gmail. You will fall in love with @RightInbox. Check out", "I started using @RightInbox. Brilliant addon to #Gmail. Must see.", ".@RightInbox is the missing feature of #Gmail. Schedule emails to be sent later. Try", "Today's productivity tip: Automate email follow up process with @RightInbox. Great tool" ], 
                    promoMessage = promoMessages[Math.floor(Math.random() * promoMessages.length)] + " http://righ.in?" + (ri.referralId || ""), 
                    referralTable = "<p>For every friend who joins and installs Right Inbox we will give you 10 bonus credits. (up to a limit of 100)</p>", 
                    referralTable += "<textarea id='ri_referral_text' class='ri_textarea ri_textinput' style='width:100%;height:60px'>" + promoMessage + "</textarea> <div id='ri_referral_text_count' style='float:right;color:#999'></div>", 
                    modelBox({
                        title: "Invite your friends to Right Inbox",
                        message: referralTable,
                        button1: {
                            enabled: !0,
                            text: '<div class="sprite-icon sprite-twitter-bird-16"> </div>Share on Twitter',
                            action: function() {
                                return shareOnNetwork("twitter", $("#ri_referral_text").val());
                            },
                            color: "white"
                        },
                        button2: {
                            enabled: !0,
                            text: '<div class="sprite-icon sprite-facebook-icon-16"> </div>Share on Facebook',
                            action: function() {
                                return shareOnNetwork("facebook");
                            },
                            color: "white"
                        }
                    }), $("#ri_referral_text").keyup(function() {
                        var maxChars;
                        return maxChars = 140, $(this).val().length > maxChars && $(this).val($(this).val().substr(0, maxChars)), 
                        $("#ri_referral_text_count").html(maxChars - $(this).val().length + " characters remaning");
                    }));
                }, ri.showRatingTable = function() {
                    var ref, ref1;
                    if ((null != (ref = ri.preferences) ? ref.hasRated : void 0) === !1 || !(null != (ref1 = ri.preferences) ? ref1.hasRated : void 0) > 2) return modelBox({
                        title: "Please rate Right Inbox on Chrome Web Store",
                        message: "We would really appreciate if you could leave us a quick review on Chrome Web Store. If you like Right Inbox, a 5-star review would help us to spread the word.",
                        button1: {
                            enabled: !0,
                            text: "Later",
                            action: function() {
                                return ri.preferences.hasRated === !1 ? ri.preferences.hasRated = 1 : ri.preferences.hasRated++, 
                                closeModelBox();
                            }
                        },
                        button2: {
                            enabled: !0,
                            text: "Rate us now",
                            action: function() {
                                return window.open("https://chrome.google.com/webstore/detail/right-inbox-for-gmail/mflnemhkomgploogccdmcloekbloobgb/reviews", "_blank"), 
                                ri.preferences.hasRated = !0, closeModelBox();
                            }
                        }
                    });
                }, ri.showPricingTable = function() {
                    var openPricingTable;
                    return openPricingTable = function() {
                        var pricingTable;
                        return "unlimited" === ri.monthlyQuota ? closeModelBox() : (pricingTable = "Upgrade for more message credits. There are no contracts, you can cancel anytime. <table id='ri_pricing' cellspacing='0' cellpadding='0'> <tbody> <tr> <th></th> <th>Limited</th> <th>Yearly <span>Save %25</span></th> <th>Monthly</th> </tr> <tr id='price_line'> <td>Price</td> <td>Free</td> <td><div>$</div>5<sup>.95 <span>/mth</span></sup></td> <td><div>$</div>7<sup>.95 <span>/mth</span></sup></td> </tr> <tr> <td>Send Later</td> <td>10 emails/month</td> <td>Unlimited</td> <td>Unlimited</td> </tr> <tr> <td>Email Reminders</td> <td>10 emails/month</td> <td>Unlimited</td> <td>Unlimited</td> </tr> <tr> <td>Recurring Emails</td> <td>Not available</td> <td>Unlimited</td> <td>Unlimited</td> </tr> <tr> <td></td> <td><span id='ri_pricing_free'><span></td> <td><span id='ri_pricing_yearly'><span></td> <td><span id='ri_pricing_monthly'><span></td> </tr> </tbody> </table> <form method='POST' action='http://sites.fastspring.com/rightinbox/api/order' id='rightinbox_monthly_form'> <input type='hidden' name='operation' value='create'/> <input type='hidden' name='destination' value='checkout'/> <input type='hidden' name='destination' value='checkout'/> <input type='hidden' name='product_1_path' value='/rightinbox-monthly'/> <input type='hidden' name='contact_email' value='" + ri.user + "'/> </form> <form method='POST' action='http://sites.fastspring.com/rightinbox/api/order' id='rightinbox_yearly_form'> <input type='hidden' name='operation' value='create'/> <input type='hidden' name='destination' value='checkout'/> <input type='hidden' name='destination' value='checkout'/> <input type='hidden' name='product_1_path' value='/rightinbox-yearly'/> <input type='hidden' name='contact_email' value='" + ri.user + "'/> </form>", 
                        modelBox({
                            title: "Right Inbox Pricing",
                            message: pricingTable,
                            button1: {
                                enabled: !1
                            }
                        }), uiButton({
                            text: "Select",
                            className: "pricing_button",
                            width: 9,
                            insertAfter: $("#ri_pricing_free"),
                            noDelegate: !0,
                            action: function() {
                                return ri.showReferralTable();
                            }
                        }), uiButton({
                            text: "Upgrade",
                            className: "pricing_button",
                            width: 9,
                            insertAfter: $("#ri_pricing_monthly"),
                            noDelegate: !0,
                            color: "blue",
                            action: function() {
                                return $("#rightinbox_monthly_form").submit();
                            }
                        }), uiButton({
                            text: "Upgrade",
                            className: "pricing_button",
                            width: 9,
                            insertAfter: $("#ri_pricing_yearly"),
                            noDelegate: !0,
                            color: "blue",
                            action: function() {
                                return $("#rightinbox_yearly_form").submit();
                            }
                        }));
                    }, ri.monthlyQuota ? openPricingTable() : authCheck(!1, function() {
                        return openPricingTable();
                    });
                }, hideNotification = function() {
                    return $(".b8.UC", getCanvasScope()).css("position", "relative").css("top", "-10000px");
                }, showNotification = function(text, timeout, undo) {
                    var ref;
                    return null == timeout && (timeout = 5), null == undo && (undo = !1), ri.undo = ri.undo || (null != (ref = /<span.*?>Undo<\/span>/.exec($(".vh", getCanvasScope()).html())) ? ref[0] : void 0) || "", 
                    $(".b8.UC .vh", getCanvasScope()).html(text + (undo ? ri.undo : "")), $(".b8.UC", getCanvasScope()).show(), 
                    $(".b8.UC", getCanvasScope()).css("top", "auto"), clearInterval(ri.interval.notification), 
                    ri.interval.notification = setTimeout(function() {
                        return hideNotification(), ri.undo = null;
                    }, 1e3 * timeout);
                }, shareOnNetwork = function(netowrk, status) {
                    var height, left, top, url, width, winHeight, winWidth;
                    switch (ri.preferences.hasReferred === !1 ? ri.preferences.hasReferred = 1 : ri.preferences.hasReferred++, 
                    netowrk) {
                      case "twitter":
                        width = 550, height = 420, url = "https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fwww.rightinbox.com%2F&text=";
                        break;

                      case "facebook":
                        width = 640, height = 436, url = "https://www.facebook.com/sharer/sharer.php?u=", 
                        status = "http://www.rightinbox.com";
                    }
                    return winHeight = screen.height, winWidth = screen.width, left = Math.round(winWidth / 2 - width / 2), 
                    screen.height > height && (top = Math.round(winHeight / 2 - height / 2)), window.open(url + encodeURIComponent(status), "intent", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=" + width + ",height=" + height + ",left=" + left + ",top=" + top);
                }, inProgressNotifications = [], showInProgressNotification = function(action) {
                    return location.search.indexOf("btop") !== -1 && overrideNativeCloseFunctions(), 
                    indexOf.call(inProgressNotifications, action) < 0 && inProgressNotifications.push(action), 
                    showNotification("Please wait, " + inProgressNotifications.join(" and ") + " " + (inProgressNotifications.length > 1 ? "are" : "is") + " in progress.", 30), 
                    setTimeout(function() {
                        return inProgressNotifications = [];
                    }, 3e4);
                }, finishedNotifications = [], showFinishedNotification = function(action) {
                    return inProgressNotifications = [], location.search.indexOf("btop") !== -1 && setTimeout(function() {
                        return ri.nativeFunc.close();
                    }, 3e3), indexOf.call(finishedNotifications, action) < 0 && finishedNotifications.push(action), 
                    showNotification((finishedNotifications.join(" and ") + ". ").capitalize(), 6), 
                    setTimeout(function() {
                        return finishedNotifications = [];
                    }, 6e3);
                }, ri.checkQuota = function(type) {
                    var quotaMessage;
                    if ("unlimited" === ri.monthlyQuota) return !0;
                    if (ri.monthlyQuota) {
                        if (ri.monthlyQuota && ri.monthlyQuota[type] < 10) return !0;
                        if (ri.monthlyQuota.numReferralCredits > 0) return !0;
                        switch (type) {
                          case "numScheduled":
                            quotaMessage = "You cannot schedule more emails because your monthly quota is exhausted.";
                            break;

                          case "numRemembered":
                            quotaMessage = "You cannot add reminders to more emails because your monthly quota is exhausted.";
                            break;

                          case "numRecurring":
                            quotaMessage = "You cannot schedule more recurring emails because your monthly quota is exhausted.";
                            break;

                          case "numNoted":
                            quotaMessage = "You cannot add notes to more emails because your monthly quota is exhausted.";
                        }
                        return modelBox({
                            title: "Right Inbox Monthly Quota Exhausted",
                            message: quotaMessage,
                            button1: {
                                text: "Later"
                            },
                            button2: {
                                enabled: !0,
                                text: "Upgrade Now",
                                action: ri.showPricingTable
                            }
                        }), !1;
                    }
                    return authCheck(), !1;
                }, ri.useQuota = function(type) {
                    var ref, ref1;
                    if ("unlimited" !== ri.monthlyQuota) return (null != (ref = ri.monthlyQuota) ? ref[type] : void 0) < 10 ? null != (ref1 = ri.monthlyQuota) ? ref1[type]++ : void 0 : ri.monthlyQuota.numReferralCredits--;
                }, ri.freeQuota = function(type) {
                    var ref;
                    if ("unlimited" !== ri.monthlyQuota) return null != (ref = ri.monthlyQuota) ? ref[type]-- : void 0;
                }, checkForNotificationMessage = function(text) {
                    var re;
                    return re = new RegExp(text, "i"), -1 !== _u.indexOf([ "auto", "0px" ], $(".b8.UC", getCanvasScope()).css("top")) && re.test($(".b8.UC .vh", getCanvasScope()).text());
                }, sentNotificationMessageActions = {}, checkSentNotificationMessage = function(label, action, button) {
                    var buttonId;
                    if (buttonId = button.attr("id").match(/ri_\d+/)[0], sentNotificationMessageActions[buttonId] || (sentNotificationMessageActions[buttonId] = {}), 
                    sentNotificationMessageActions[buttonId][label] = function() {
                        return action(button);
                    }, ri.interval.composeHeaders[button.selector] = setInterval(function() {
                        return ri.composeHeaders[button.selector] = extendWithComposeHeaders(button, {}, {
                            from: "from",
                            to: "to",
                            cc: "cc",
                            bcc: "bcc",
                            subject: "subject"
                        });
                    }, 500), !ri.interval.sentNotificationMessage) return ri.interval.sentNotificationMessage = setInterval(function() {
                        if (checkForNotificationMessage("(" + ri.i18n.msg_sent.join("|") + ")")) return $.each(sentNotificationMessageActions, function(buttonId, actionObj) {
                            if (0 === $("#send_later_" + buttonId).length || location.search.indexOf("btop") !== -1 || isReplyScreen($("#send_later_" + buttonId))) return $.each(actionObj, function(actionType, action) {
                                return removeSentNotificationMessageAction(actionType, buttonId), action();
                            });
                        });
                    }, 450);
                }, removeSentNotificationMessageAction = function(key, buttonId) {
                    if (sentNotificationMessageActions[buttonId] && ($.each(sentNotificationMessageActions[buttonId], function(actionType, action) {
                        if (key === actionType && (delete sentNotificationMessageActions[buttonId][actionType], 
                        0 === Object.keys(sentNotificationMessageActions[buttonId]).length)) return delete sentNotificationMessageActions[buttonId];
                    }), 0 === Object.keys(sentNotificationMessageActions).length)) return clearInterval(ri.interval.sentNotificationMessage), 
                    ri.interval.sentNotificationMessage = null;
                }, requestXMLHttp = function(action, data, callback) {
                    var getSessionId, startXMLHttp;
                    return getSessionId = function() {
                        var sid;
                        return sid = $.cookie("RIGSID") || uuid(), "undefined" === sid && (sid = uuid()), 
                        $.cookie("RIGSID", sid, {
                            expires: 7,
                            path: "/"
                        }), sid;
                    }, startXMLHttp = function(action, data, callback, tries) {
                        var XMLHttp, callbackWatcher, keepTrying, requestId, serverNo, src;
                        return null == tries && (tries = 0), $.extend(!0, data, {
                            user: ri.user
                        }), requestId = Math.random(), ri.scriptCallback[requestId] = callback, serverNo = 0 < tries && tries <= 5 && !isTestEnvironment() ? tries : "", 
                        XMLHttp = new RemoteReq({
                            type: "xmlhttp",
                            sid: getSessionId()
                        }), src = "handShake" === action ? "https://init" + serverNo + ".rightinbox.com/js/" + requestId + "/" + action : "log" === action ? "https://logger.rightinbox.com/log/" + requestId : "https://app" + serverNo + ".rightinbox.com/js/" + requestId + "/" + action, 
                        XMLHttp.src = src + "?cv=" + ri.cliVersion, XMLHttp.data = JSON.stringify(data), 
                        keepTrying = !0, callbackWatcher = setTimeout(function() {
                            return keepTrying = !1;
                        }, 29e3), XMLHttp.onerror = function(e1, e2) {
                            var discardedActionsNotToShowErr051s, f;
                            return keepTrying && tries < 5 && XMLHttp.src.indexOf("logger") === -1 ? (tries++, 
                            setTimeout(function() {
                                return startXMLHttp(action, data, callback, tries);
                            }, 1e3 * tries), f = tries < 5 ? "warn" : "error", jsLog[f]({
                                type: "Err051",
                                tries: tries,
                                action: action,
                                requestId: requestId
                            })) : (hideNotification(), callback ? callback("XMLHttpLoadError") : (discardedActionsNotToShowErr051s = [ "checkRememberedEmail", "checkNote", "updatePreferences", "updateNewPreferences", "handShake", "log", "checkRecurringEmail", "unScheduleEmail" ], 
                            indexOf.call(discardedActionsNotToShowErr051s, action) < 0 ? modelBox({
                                title: "Right Inbox Error (Err: 051)",
                                message: "Right Inbox cannot be utilized right now. Please try again later. <br /> If you have any questions please <a href='mailto:support@rightinbox.com?subject=About Err 051&body=Hi, I have come across Error 051 while using Right Inbox. Please have a look. Details: " + action + " - " + requestId + " - " + JSON.stringify(data) + "'>let us know</a>",
                                button1: {
                                    text: "Close",
                                    color: "white"
                                }
                            }) : void 0));
                        }, XMLHttp.onload = function(response) {
                            return clearTimeout(callbackWatcher), response = JSON.parse(response), XMLHttpCallback(response.data, response.requestId, action);
                        }, XMLHttp.load();
                    }, ri.user ? startXMLHttp(action, data, callback) : getGmailUser(function(gmailUser) {
                        return gmailUser ? (ri.user = gmailUser, startXMLHttp(action, data, callback)) : jsLog.error({
                            type: "Err052",
                            title: document.title
                        });
                    });
                }, XMLHttpCallback = function(_this) {
                    return function(data, requestId, action) {
                        var email, now, oneDayAgo, reauthPopup, ref, ref1, ref2, ref3, ref4, tryOauthPref;
                        return data.notification ? (modelBox({
                            title: null != (ref = data.notification.title) ? ref : "Error",
                            type: null != (ref1 = data.notification.type) ? ref1 : "normal",
                            message: null != (ref2 = data.notification.message) ? ref2 : "",
                            button1: {
                                text: null != (ref3 = data.notification.buttonText) ? ref3 : "Close",
                                color: null != (ref4 = data.notification.buttonColor) ? ref4 : "blue",
                                action: function() {
                                    return data.notification.action ? ri[data.notification.action](data.notification.params) : closeModelBox();
                                }
                            }
                        }), data.auth === !0 && "function" == typeof ri.scriptCallback[requestId] && ri.scriptCallback[requestId](null, data), 
                        ri.scriptCallback[requestId](!0)) : data.auth === !1 && null != data.redirect ? (oneDayAgo = new Date().getTime() - 864e5, 
                        now = new Date().getTime(), email = data.redirect.substr(data.redirect.lastIndexOf("/") + 1), 
                        reauthPopup = function(title, message) {
                            return modelBox({
                                title: title,
                                message: message,
                                button1: {
                                    text: "Continue",
                                    color: "blue",
                                    disableOnClick: !0,
                                    action: function() {
                                        return redirectToAuth(data.redirect);
                                    }
                                },
                                closeAction: function() {
                                    return disablePrompt();
                                }
                            });
                        }, data.tryOauth ? "handShake" === action ? (tryOauthPref = getLocalPrefs("tryOauth+" + email), 
                        "" === tryOauthPref || tryOauthPref < oneDayAgo ? (setLocalPrefs("tryOauth+" + email, now), 
                        setTimeout(function() {
                            return jsLog.warn({
                                type: "Err010",
                                key: "RIGSIDTEST",
                                tryOauthPref: tryOauthPref,
                                location: location.href,
                                redirect: data.redirect,
                                now: now,
                                oneDayAgo: oneDayAgo,
                                monthlyQuota: ri.monthlyQuota
                            }), authCheck();
                        }, 3e4), redirectToAuth(data.redirect)) : (reauthPopup("Right Inbox needs re-authentication (Err: 011)", "Please continue to finish the process.<br>You may also try refreshing your browser and giving it another try. <a href='mailto:support@rightinbox.com?subject=About Err 011&body=Hi, I have come across Error 011 while using Right Inbox. Please have a look. Details: " + tryOauthPref + "'>Let us know</a> if you have any trouble at this step."), 
                        jsLog.warn({
                            type: "Err011",
                            key: "RIGSIDTEST",
                            tryOauthPref: tryOauthPref,
                            location: location.href,
                            redirect: data.redirect,
                            now: now,
                            oneDayAgo: oneDayAgo
                        }))) : (reauthPopup("Action cannot be completed (Err: 012)", "Right Inbox needs re-authentication. Please continue to finish the process. <br>You may also try refreshing your browser and giving it another try. <a href='mailto:support@rightinbox.com?subject=About Err 012&body=Hi, I have come across Error 012 while using Right Inbox. Please have a look.'>Let us know</a> if you have any trouble at this step."), 
                        jsLog.error({
                            type: "Err012",
                            key: "RIGSIDTEST",
                            action: action
                        })) : (reauthPopup("Right Inbox is almost ready!", "You will soon be able to start using our service. Please continue to finish installation."), 
                        ri.scriptCallback[requestId](!0))) : data.reload ? location.reload() : "function" == typeof ri.scriptCallback[requestId] ? ri.scriptCallback[requestId](null, data) : void 0;
                    };
                }(this), logRateLimit = new RateLimit(60, 36e5, !0), jsLog.log = function(logType, data) {
                    return "object" != typeof data && (data = {
                        msg: data
                    }), data.user = ri.user, data.logType = logType, data.cliVersion = ri.cliVersion, 
                    logRateLimit.run(function() {
                        return requestXMLHttp("log", data);
                    });
                }, jsLog.error = function(data) {
                    return jsLog.log("error", data);
                }, jsLog.warn = function(data) {
                    return jsLog.log("warn", data);
                }, jsLog.info = function(data) {
                    return jsLog.log("info", data);
                }, jsLog.debug = function(data) {
                    return jsLog.log("debug", data);
                }, goals = [], jsLog.goal = function(goal) {
                    var e;
                    try {
                        if (ri.user && indexOf.call(getLocalPrefs("goals" + ri.user), goal) < 0) return setLocalPrefs("goals" + ri.user, [ goal ]), 
                        goals.push(goal);
                    } catch (_error) {
                        return void (e = _error);
                    }
                }, setInterval(function() {
                    if (goals.length > 0) return jsLog.log("info", {
                        goals: _u.uniq(goals)
                    }), goals = [];
                }, 6e4), init();
            }(jQuery);
        }();
    }());
}).call(this), style = document.createElement("style"), style.setAttribute("type", "text/css"), 
document.head.appendChild(style), style.innerHTML = "#ri_pricing tr td:first-child,div.time-picker{white-space:nowrap}#ri_pricing tr td:not(:first-child),.gldp-default td,.ri_thin_input{text-align:center}.T-ays-W095bf,div[role=tooltip]{max-width:220px}.gldp-default{float:left;font-size:.9em!important;background-color:#fff!important;border:1px solid #DDD!important;-webkit-box-shadow:0 4px 16px rgba(0,0,0,.2)}.gldp-default table{border-spacing:0;border-collapse:inherit}.gldp-default tr{line-height:24px}.gldp-default td{margin:0;padding:0;width:24px}.gldp-default-prevnext{color:#AAA;cursor:pointer;font-weight:700}.gldp-default-monyear{color:#444;font-size:.95em!important;font-weight:700}.gldp-default-dow{background-color:#eee;color:#333;font-size:.9em!important;font-weight:700}.gldp-default-day{background-color:#fff!important;color:#222;border:1px solid #fff}.gldp-default-day-hover{background-color:#eee!important;color:#000!important;border:1px solid #fff;cursor:pointer}.gldp-default-selected{background-color:#eee;color:#222;border:1px solid #333}.gldp-default-today,.gldp-default-today-hover{color:#000;border:1px solid #eee;font-weight:700}.gldp-default-today{background-color:#fff}.gldp-default-today-hover{background-color:#eee;cursor:pointer}.gldp-default-sat,.gldp-default-sun{background-color:#fff;color:#999;border:1px solid #fff}.gldp-default-sat-hover,.gldp-default-sun-hover{background-color:#eee;color:#000;border:1px solid #eee;cursor:pointer}.gldp-default-nextmonth,.gldp-default-noday,.gldp-default-prevmonth{background-color:#fff;border:1px solid #fff;color:#ccc}.gldp-default-nextmonth-hover,.gldp-default-prevmonth-hover{background-color:#eee;color:#000;border:1px solid #eee;cursor:pointer}.T-I-RIg,.T-I-RIo,.T-I-RIy{color:#fff;text-shadow:0 1px rgba(0,0,0,.1)}.T-I-RIg{background-color:#3D9400;background-image:-webkit-linear-gradient(top,#3D9400,#398A00);background-image:-moz-linear-gradient(top,#3D9400,#398A00);background-image:-ms-linear-gradient(top,#3D9400,#398A00);background-image:-o-linear-gradient(top,#3D9400,#398A00);background-image:linear-gradient(top,#3D9400,#398A00);border:1px solid #29691D}.T-I-RIo{background-color:#FDA352;background-image:-webkit-linear-gradient(top,#FDA352,#FB8F3D);background-image:-moz-linear-gradient(top,#FDA352,#FB8F3D);background-image:-ms-linear-gradient(top,#FDA352,#FB8F3D);background-image:-o-linear-gradient(top,#FDA352,#FB8F3D);background-image:linear-gradient(top,#FDA352,#FB8F3D);border:1px solid #FB8F3D}.T-I-RIy{background-color:#fbbc05;background-image:-webkit-linear-gradient(top,#fbbc05,#fba805);background-image:-moz-linear-gradient(top,#fbbc05,#fba805);background-image:-ms-linear-gradient(top,#fbbc05,#fba805);background-image:-o-linear-gradient(top,#fbbc05,#fba805);background-image:linear-gradient(top,#fbbc05,#fba805);border:1px solid #fba805}.T-Jo-RI{background-color:rgba(255,255,255,.95);border:1px solid rgba(225,255,255,.3)}#ri_pricing th:nth-child(3),#ri_pricing tr td:nth-child(3){border-left:1px solid #4D90FE;border-right:1px solid #4D90FE}#ri_pricing{width:100%;margin-top:15px}#ri_pricing td{border-top:1px solid #E5E5E5;margin:0;padding:6px;width:22%}#ri_pricing tr#price_line td:not(:first-child){color:#3D9400;font-size:1.8em;padding:12px}#ri_pricing tr#price_line div{font-size:.8em;display:inline;margin-right:.1em}#ri_pricing tr#price_line sup{font-size:.6em}#ri_pricing th span{color:#dd4b39;font-size:.7em;display:block;text-transform:uppercase;font-weight:700;letter-spacing:1px;margin-top:2px}.ri_recurring_details,.ri_uimenu>.setgmelius{display:none}#ri_pricing tr#price_line td span{color:gray;font-size:.4em}#ri_pricing tr#price_line td:nth-child(2){font-size:1.4em}#ri_pricing tr:not(:last-child) td:nth-child(even){background-color:#F3F3F3}#ri_pricing tr:last-child td:nth-child(3){border-bottom:1px solid #4D90FE}#ri_pricing tr:last-child td{padding-top:20px;padding-bottom:15px;padding-left:9px}#ri_pricing th{padding:15px;font-size:1.2em;font-weight:400}#ri_pricing th:nth-child(3){border-top:1px solid #4D90FE}.pricing_button{font-size:1em;font-weight:400;margin-left:5px;margin-right:5px;cursor:pointer}.sprite-facebook-icon-16{background-image:url(data:image/.png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA9klEQVR42s2TPQrCQBCFcwkPIeIJ1KAgdnZpjI1IEDWSSlD8xR+EgK341wk2ikUsRLDRC3gRwcr+6SwMkiIrQRAfPNjZ3ffNbjFKOFkNhOLWNaiW4ceUoaxCi1R2iHJ3i8rAeXn/wQ5KnQ1S+gChhHVViFZsb5AurRDT54hkZlJH9Rk0ay0gQdWEAJh9hw48Q7n6Frf7AyzaM3uOCyDrymE3oO8DwOL6dwAvyQHuvwuzuP72C/8IsJcX5Bs7T7O4Nlo72IvzGzCanlC1DzCacgCHa+MjhpOjAIhh0gpj2nhRL/Qaqakz3dUMG5QV40xTRTQ/5nF+AqtdbhBeGSSgAAAAAElFTkSuQmCC)}.sprite-twitter-bird-16{background-image:url(data:image/.png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABi0lEQVR42qVSS0sCURQ+0lAtpFqIUZuMgiQihB67iDZRBO7a9DNaFxSEFPSCoDJCCywRi0pCQbARelAEPsCgaGFhIEb5yBbR5nbOMDoj45DgwHfv5X6POffcC4yxqlB9AM/zAPOeJpoVEDnEGoJH2BEGGWegwaRZ8EZIWM4scNYYg/04g91HprH4s2JguHHlYhLatq7HwZFgKHyhMHkAZ/FNEwdHaQmud0aBNQeJL+3GrRPMJ7FegXAmGSwFmLzMFlt0lbhy6PJ+urAHRtCvB0e7/Tl3gaAyweKnoDi3HU2oBeDXKRxz0BEawpIUAqyIUNbccJZ5LvYJk7RSBZWh4zR5WAygYfY+NdwXyO1xx+l8JQGkLwkwu8PNddboA3b4X3O7L+vDqutLAnCDQ/RPXOUXSYBC1bN7XvMD8quWPxqTfie0XGt7elMzB1M/I/QzeQAZ5xAZ4Q1sRhSdp75Qf5Rm6RYMNx+/Y1N33zMkbD3PXtIxaE17xJFGMisDCj3QicIehFFc60QO1PAH33mA2ZW112wAAAAASUVORK5CYII=)}div.time-picker{position:absolute;height:191px;overflow:auto;background:#fff;border:1px solid #aaa;z-index:99;margin:0}div.time-picker ul{list-style-type:none;margin:0;padding:0}div.time-picker li span{font-size:.9em;color:#ac6b5f}div.time-picker li{cursor:pointer;height:11px;font-size:.8em;padding:4px 20px 4px 3px}div.time-picker li.selected{background:#357AE8!important;color:#fff}div.time-picker li.selected span{background:#357AE8!important;color:#fff!important}input.rbx:hover{border-color:#A0A0A0 #B9B9B9 #B9B9B9;box-shadow:inset 0 1px 2px rgba(0,0,0,.1)}.font-gray{color:#CCC;font-size:90%}.font-red{color:#D14836}.natural-link{color:#999;cursor:pointer}.natural-link:hover{color:#666}.small-gray-link{font-size:.85em;color:#999;cursor:pointer}.small-gray-link:hover{color:#666}.transparent-bg-delete-link{color:#999!important;cursor:pointer!important;box-shadow:none!important;background:0 0!important;border:none!important}.transparent-bg-delete-link:hover{color:#dd4b39!important;text-decoration:underline!important}.T-ays-W095bf{max-height:320px;overflow:auto}.ri_textarea{height:auto;resize:none;box-sizing:border-box;-webkit-box-sizing:border-box;-moz-box-sizing:border-box}.ri_textinput:focus{-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.3);-moz-box-shadow:inset 0 1px 2px rgba(0,0,0,.3);box-shadow:inset 0 1px 2px rgba(0,0,0,.3);border:1px solid #4D90FE;outline:0}.ri_textinput{-webkit-border-radius:1px;-moz-border-radius:1px;border-radius:1px;border:1px solid #D9D9D9;border-top:1px solid silver;font-size:13px;height:25px;padding:5px 8px}.T-I-RIr,.T-I-RIr:hover{border:1px solid #B0281A;color:#fff;text-shadow:0 1px rgba(0,0,0,.1)}.ri_gray_label{background:#eee;padding:2px 3px}.sprite-icon{background-repeat:no-repeat;width:16px;height:16px}button>.sprite-icon{margin-top:5px;margin-right:5px;float:left}.ri_thin_input{width:30px;padding-left:0!important;padding-right:0!important}.T-I-RIr{background-color:#D14836;background-image:-webkit-linear-gradient(top,#DD4B39,#D14836);background-image:-moz-linear-gradient(top,#DD4B39,#D14836);background-image:-ms-linear-gradient(top,#DD4B39,#D14836);background-image:-o-linear-gradient(top,#DD4B39,#D14836);background-image:linear-gradient(top,#DD4B39,#D14836)}.T-I-RIr:hover{background-color:#C53727;background-image:-webkit-linear-gradient(top,#DD4B39,#C53727);background-image:-moz-linear-gradient(top,#DD4B39,#C53727);background-image:-ms-linear-gradient(top,#DD4B39,#C53727);background-image:-o-linear-gradient(top,#DD4B39,#C53727);background-image:linear-gradient(top,#DD4B39,#C53727)}.ri_buttonsrow,.ri_inforow{background-color:#f5f5f5;border:1px solid #CFCFCF;border-width:0 1px 1px;margin:-7px -1px 0;overflow-y:hidden;padding:6px;border-top:1px solid #f5f5f5}.ri_smallbutton{line-height:22px!important;height:24px!important}.ri_addcustomtime{margin-top:0}.ri_modelbox_wide{width:660px!important;margin-left:-330px!important}.wL{margin-left:14px!important}.T-I-RIg .G-asx,.T-I-RIo .G-asx,.T-I-RIr .G-asx,.T-I-RIy .G-asx{background:url(//ssl.gstatic.com/ui/v1/zippy/arrow_down_white.png) 0 1px no-repeat}.D.E.G-atb{z-index:3}.xr .aDh{height:70px}.xr .aDg{bottom:36px}.xr .et{margin-bottom:36px}.xr .ri_buttonsrow{margin-top:-32px}.xr .GW{margin-bottom:32px!important}.ri_data_picker_window>div>div,.ri_data_picker_window>div>div>div>div{float:left;padding-right:10px;line-height:1.7em}.ri_cb{clear:both;float:none}.ri_cb~div{line-height:2.7em!important}.ri_slb.ri_button_align{vertical-align:middle}.ri_tight_right_margin{margin-right:12px!important}.ri_tight_left_margin{margin-left:12px!important}", 
document.getElementById("canvas_frame") && (rdoc = navigator.userAgent.indexOf("Firefox") != -1 ? document : document.getElementById("canvas_frame").contentDocument, 
style = rdoc.createElement("style"), style.setAttribute("type", "text/css"), rdoc.head && rdoc.head.appendChild(style), 
style.innerHTML = ".T-I-RIg,.T-I-RIo{color:#fff;text-shadow:0 1px rgba(0,0,0,.1)}.T-I-RIg{background-color:#3D9400;background-image:-webkit-linear-gradient(top,#3D9400,#398A00);background-image:-moz-linear-gradient(top,#3D9400,#398A00);background-image:-ms-linear-gradient(top,#3D9400,#398A00);background-image:-o-linear-gradient(top,#3D9400,#398A00);background-image:linear-gradient(top,#3D9400,#398A00);border:1px solid #29691D}.T-I-RIo{background-color:#FDA352;background-image:-webkit-linear-gradient(top,#FDA352,#FB8F3D);background-image:-moz-linear-gradient(top,#FDA352,#FB8F3D);background-image:-ms-linear-gradient(top,#FDA352,#FB8F3D);background-image:-o-linear-gradient(top,#FDA352,#FB8F3D);background-image:linear-gradient(top,#FDA352,#FB8F3D);border:1px solid #FB8F3D}.T-Jo-RI{background-color:rgba(255,255,255,.95);border:1px solid rgba(225,255,255,.3)}");