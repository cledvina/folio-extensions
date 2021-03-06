// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#FFFFFF'}, function() {
    console.log("The color is green.");
  });
});
chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { urlContains: 'folio.indexdata.com\/inventory\/view\/' },
    })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});