import {
  REACT_APP_PROD_HOST,
  REACT_APP_DEV_HOST,
  REACT_APP_DEV_PORT
} from '@env'
export default process.env.NODE_ENV === 'production'
  ? REACT_APP_PROD_HOST
  : `${REACT_APP_DEV_HOST}:${REACT_APP_DEV_PORT}`
