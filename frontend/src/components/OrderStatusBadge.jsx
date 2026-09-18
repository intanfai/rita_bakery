const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-800',
  diproses: 'bg-blue-100 text-blue-800',
  selesai: 'bg-green-100 text-green-800',
  dibatalkan: 'bg-red-100 text-red-800',
}

export default function OrderStatusBadge({ status }) {
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  )
}