import API from '../../api/email'

export const COMPOSE_TO = 'COMPOSE_TO'
export const COMPOSE_SUBJECT = 'COMPOSE_SUBJECT'
export const COMPOSE_MESSAGE = 'COMPOSE_MESSAGE'
export const TRASH_MESSAGE = 'TRASH_MESSAGE'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const ERROR_SEND_MESSAGE = 'ERROR_SEND_MESSAGE'
export const LOADING = 'LOADING'

export const updateTo = (toAddress) => {
  return (dispatch) => {
    dispatch({
      type: COMPOSE_TO,
      payload: { to: toAddress }
    })
  }
}

export const updateSubject = (subject) => {
  return (dispatch) => {
    dispatch({
      type: COMPOSE_SUBJECT,
      payload: { subject }
    })
  }
}

export const updateMessage = (message) => {
  return (dispatch) => {
    dispatch({
      type: composeEmailActions.COMPOSE_MESSAGE,
      payload: { message }
    })
  }
}

export const trashMessage = () => {
  return (dispatch) => {
    dispatch({
      type: composeEmailActions.TRASH_MESSAGE,
      payload: {
        to: '',
        subject: '',
        message: ''
      }
    })
  }
}

export const sendMessage = () => {
  return (dispatch, getState) => {
    dispatch({
      type: composeEmailActions.LOADING,
      payload: {
        loading: true
      }
    })
    const profile = getState().Profile
    const email = getState().ComposeEmail
    API.post('/send-email', {
      email: profile.email,
      password: profile.password,
      smtp_server: profile.smtp_server,
      smtp_port: profile.smtp_port,
      fromAddress: profile.email,
      name: profile.name,
      toAddress: email.to,
      subject: email.subject,
      bodyPLAIN: email.message
    })
      .then((result) => {
        dispatch({
          type: composeEmailActions.SEND_MESSAGE,
          payload: {
            to: '',
            subject: '',
            message: '',
            error: '',
            loading: false
          }
        })
        alert('Email Successfully Sent')
      })
      .catch(() => {
        dispatch({
          type: composeEmailActions.SEND_MESSAGE,
          payload: {
            to: email.to,
            subject: email.subject,
            message: email.message,
            loading: false
          }
        })
        alert('Email Was Not Send')
      })
  }
}
