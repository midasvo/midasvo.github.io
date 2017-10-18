function inputBinder(inputID, replaceTags, templateText, templateClass) {
	var self = this;
	var __construct = function() {
		self._settings = {
			inputID: inputID,
			replaceTags: replaceTags,
			templateText: templateText,
			templateClass: templateClass
		}
		self.trackInput = function() {
			var e = document.getElementById(self._settings.inputID);
			e.addEventListener("input", function() {
				self.performReplace();
			}, false);
		};

		self.performReplace = function() {
			var websiteVal = self.getValue();
			var targets = document.getElementsByClassName(self._settings.templateClass);
			for (var i = 0; i < targets.length; i++) {
				targets[i].textContent = websiteVal;
			}
		};

		self.insertTemplate = function() {
			self.replaceTags(self._settings.templateText, "<span class='" + self._settings.templateClass + "'>TEMPLATETEXT</span>");
		};

		self.replaceTags = function(replacetext, newtext) {
			for (var i = 0; i < self._settings.replaceTags.length; i++) {
				self.replaceContentByTag(self._settings.replaceTags[i], replacetext, newtext);
			}
		};

		self.getValue = function() {
			return document.getElementById(self._settings.inputID).value;
		};

		self.replaceContentByTag = function(tag, replacetext, newtext) {
			var tags = document.getElementsByTagName(tag);
			for (var i = 0; i < tags.length; i++) {
				tags[i].innerHTML = tags[i].innerHTML.replace(replacetext, newtext);
			}
		};

		self.insertTemplate();
		self.performReplace();
		self.trackInput();
	}();
}