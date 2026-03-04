import React from 'react';
import PrimaryButton from '../../../shared/PrimaryButton';

const DonationEdit = ({ editingRequest, handleSaveEdit, handleCancel }) => {
  

   
    return (
        <div>
            {editingRequest && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
                        <h2 className="text-xl font-bold mb-4">Edit Request</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault(); handleSaveEdit({
                                bloodGroup: e.target.bloodGroup.value,
                                recipientDistrict: e.target.recipientDistrict.value,
                                recipientUpazila: e.target.recipientUpazila.value,
                                hospitalName: e.target.hospitalName.value,
                                address: e.target.address.value,
                                message: e.target.message.value,
                                donationTime: e.target.donationTime.value,

                            });
                        }}>
                            <input name="recipientName" readOnly value={editingRequest.recipientName} placeholder="Recipient Name" className="border p-2 mb-2 w-full" />
                            <input
                                name="recipientDistrict"
                                defaultValue={editingRequest.recipientDistrict || ""}
                                placeholder="District"
                                className="border p-2 mb-2 w-full"
                            />

                            <input
                                name="address"
                                defaultValue={editingRequest.address || ""}
                                placeholder="Address"
                                className="border p-2 mb-2 w-full"
                            />
                            <input
                                name="recipientUpazila"
                                defaultValue={editingRequest.recipientUpazila || ""}
                                placeholder="Upazila"
                                className="border p-2 mb-2 w-full"
                            />


                            <input name="hospitalName" defaultValue={editingRequest.hospitalName} placeholder="Hospital" className="border p-2 mb-2 w-full" />
                            <input name="bloodGroup" defaultValue={editingRequest.bloodGroup} placeholder="Blood Group" className="border p-2 mb-2 w-full" />
                            <input name="donationTime" defaultValue={editingRequest.donationTime} placeholder="Time" className="border p-2 mb-2 w-full" />
                            <textarea name="message" defaultValue={editingRequest.message} placeholder="Message" className="border p-2 mb-2 w-full" />
                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-3 py-1 bg-gray-300 rounded"
                                >
                                    Cancel
                                </button>
                                <PrimaryButton text={"Update"} type="submit" className="px-3 py-1 bg-blue-500 text-white rounded" />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonationEdit;