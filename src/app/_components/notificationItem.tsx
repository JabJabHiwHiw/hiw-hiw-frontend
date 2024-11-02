import type { Notification } from '@/app/types'
import { faCircleExclamation, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function NotificationItem(props: Notification) {
  const { id, message, expireDate } = props

  const handleDelete = () => {
    // delete notification
    console.log('delete notification', id)
  }

  return (
    <div className="w-full h-[54px] flex items-center  gap-5 lg:gap-0 lg:justify-between">
      <div className="flex gap-3 items-center">
        <FontAwesomeIcon
          icon={faCircleExclamation}
          className="text-red-500"
          size={'1x'}
        />

        <div className="inline-block align-bottom">
          <span className="h5 leading-none h-full pr-3">{message}</span>
          <span className="small text-gray-400 h-full ">{expireDate}</span>
        </div>
      </div>
      <button type="button" onClick={handleDelete}>
        <FontAwesomeIcon icon={faX} />
      </button>
    </div>
  )
}
