export default userAgent => {
  if (userAgent) {
    let browserName = navigator.appName
    let nameOffset, versionOffset
    let osName = "Unknown"

    // In Opera, the true version is after "Opera" or after "Version"
    if ((versionOffset = userAgent.indexOf("Opera")) != -1) {
      browserName = "Opera"
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((versionOffset = userAgent.indexOf("MSIE")) != -1) {
      browserName = "Microsoft Internet Explorer"
    }
    // In Chrome, the true version is after "Chrome" 
    else if ((versionOffset = userAgent.indexOf("Chrome")) != -1) {
      browserName = "Chrome"
    }
    // In Safari, the true version is after "Safari" or after "Version" 
    else if ((versionOffset = userAgent.indexOf("Safari")) != -1) {
      browserName = "Safari"
    }
    // In Firefox, the true version is after "Firefox" 
    else if ((versionOffset = userAgent.indexOf("Firefox")) != -1) {
      browserName = "Firefox"
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ((nameOffset = userAgent.lastIndexOf(' ') + 1) < (versionOffset = userAgent.lastIndexOf('/'))) {
      browserName = userAgent.substring(nameOffset, versionOffset)
      if (browserName.toLowerCase() === browserName.toUpperCase()) {
        browserName = navigator.appName
      }
    }


    if (userAgent.indexOf("Win") != -1) osName = "Windows"
    if (userAgent.indexOf("Mac") != -1) osName = "MacOS"
    if (userAgent.indexOf("X11") != -1) osName = "Unix"
    if (userAgent.indexOf("Linux") != -1) osName = "Linux"
    if (userAgent.indexOf("Android") != -1) osName = "Android"
    if (userAgent.indexOf("like Mac") != -1) osName = "iOS"

    return { browserName, osName }
  } else {
    return { browserName: 'Unknown', osName: 'Unknown' }
  }
}
