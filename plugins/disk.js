/*
 * Copyright 2018 Björn Geschka <bjoern@geschka.org>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
module.exports.command = "df {disk}";
module.exports.args = ["disk"];
module.exports.descr = "Test for diskspace using df command, this test is marked BAD if diskusage is higher than 90%";

module.exports.parse = function (resultstring) {
	console.log('disk 1:', resultstring);
	var l = resultstring.split('\n')[1];
	console.log('disk 2 line:', l);
	var parts = l.split(/\s+/)[4];
	console.log('disk 3 parts:', parts);
	if(!parts) {
		console.log('disk 4 failed to get parts');
		//throw "failed to parse [" + resultstring + "]";
		return resultstring;
	}
	parts = parts.replace( /\D+/g, '');
	return parts;	
};

module.exports.bad = function (parsedresult) {
        return (parsedresult > 90);
};

module.exports.view = {
	module: "gauge",
	bad : 80,
	max : 100,
	min : 1
};


