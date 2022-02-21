import { NotificationManager } from 'react-notifications';

const notify = (type, message, title, timeout, callback) => {
  NotificationManager[type](message, title, timeout, callback)
}

export const notifyInfo = (message, title, timeout, callback) => {
  notify("info", message, title, timeout, callback)
}

export const notifySuccess = (message, title, timeout, callback) => {
  notify("info", message, title, timeout, callback)
}

export const notifyWarning = (message, title, timeout, callback) => {
  notify("info", message, title, timeout, callback)
}

export const notifyError = (message, title, timeout, callback) => {
  notify("info", message, title, timeout, callback)
}
      