---
title: Snitch
description: Logging and crash handling system
link: https://github.com/JujuAdams/snitch/
logo: https://raw.githubusercontent.com/JujuAdams/Snitch/main/LOGO.png
supportLink: https://github.com/JujuAdams/snitch/issues
date: 2024-03-11 02:10:00
tags:
  - logging
  - error
  - lts
authors:
  - Juju Adams
---

Snitch is a logging and crash tracking system. During development, Snitch can help you debug challenging situations through its comprehensive logging, including UDP broadcasts. In production, Snitch can catch crashes and exceptions and route that information to a bug tracking service of your choosing.

Snitch supports REST APIs for the following services:
- sentry.io
- GameAnalytics
- Bug Snag
- Generic error reporting endpoints