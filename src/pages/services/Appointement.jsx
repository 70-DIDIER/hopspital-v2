export default function Appointement() {
    return (
        <div className="bg-white text-center rounded p-5">
            <h1 className="mb-4">Book An Appointment</h1>
            <form>
                <div className="row g-3">
                    <div className="col-12 col-sm-6">
                        <select
                            className="form-select bg-light border-0"
                            style={{ height: 55 }}
                        >
                            <option selected="">Choose Department</option>
                            <option value={1}>Department 1</option>
                            <option value={2}>Department 2</option>
                            <option value={3}>Department 3</option>
                        </select>
                    </div>
                    <div className="col-12 col-sm-6">
                        <select
                            className="form-select bg-light border-0"
                            style={{ height: 55 }}
                        >
                            <option selected="">Select Doctor</option>
                            <option value={1}>Doctor 1</option>
                            <option value={2}>Doctor 2</option>
                            <option value={3}>Doctor 3</option>
                        </select>
                    </div>
                    <div className="col-12 col-sm-6">
                        <input
                            type="text"
                            className="form-control bg-light border-0"
                            placeholder="Your Name"
                            style={{ height: 55 }}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <input
                            type="email"
                            className="form-control bg-light border-0"
                            placeholder="Your Email"
                            style={{ height: 55 }}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="date" id="date" data-target-input="nearest">
                            <input
                                type="text"
                                className="form-control bg-light border-0 datetimepicker-input"
                                placeholder="Date"
                                data-target="#date"
                                data-toggle="datetimepicker"
                                style={{ height: 55 }}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="time" id="time" data-target-input="nearest">
                            <input
                                type="text"
                                className="form-control bg-light border-0 datetimepicker-input"
                                placeholder="Time"
                                data-target="#time"
                                data-toggle="datetimepicker"
                                style={{ height: 55 }}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary w-100 py-3" type="submit">
                            Make An Appointment
                        </button>
                    </div>
                </div>
            </form>
        </div>

    );
}