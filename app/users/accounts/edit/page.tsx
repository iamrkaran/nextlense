import Layout from '@/components/Layout';

const EditProfile = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col w-1/2 space-y-4">
          <h1 className="text-2xl font-bold mb-5">Edit Profile</h1>

          <div className="flex flex-col space-y-2">
            <label htmlFor="website" className="font-bold">Website</label>
            <input id="website" type="text" placeholder="Your website" className="border p-2 rounded"/>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="bio" className="font-bold">Bio</label>
            <textarea id="bio" placeholder="Your bio" className="border p-2 rounded"/>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="gender" className="font-bold">Gender</label>
            <select id="gender" className="border p-2 rounded">
              <option>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="show-account" className="font-bold">Show account suggestions on profiles</label>
            <input id="show-account" type="checkbox" className="border p-2 rounded"/>
          </div>

          <button className="px-4 py-2 mt-5 font-bold text-white bg-blue-500 rounded">Save</button>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
