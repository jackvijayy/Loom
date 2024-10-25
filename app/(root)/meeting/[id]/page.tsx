

const Meeting = ({ params }: { params: { id: string } }) => {
  return (
    <div>page: {params.id}</div>
  )
}

export default Meeting