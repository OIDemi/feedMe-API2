import React, { useState } from 'react'
import { Button, Modal } from 'antd'

const ModalList = ({ ingredients }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }


  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="flex justify-center py-3">
        <Button type="primary" onClick={showModal} className="modal-btn">
          View Ingredients
        </Button>
      </div>
      {/* Footer removes Cancel and OK button from the Ant Design modal */}
      <Modal
        title="Ingredients"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}>
        <ul>
          {ingredients.map((ingredient, index) => {
            return (
              <li key={index} className="list-disc">
                {ingredient}
              </li>
            )
          })}
        </ul>
      </Modal>
    </>
  )
}

export default ModalList
