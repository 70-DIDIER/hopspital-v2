export default function Appointement() {
    return (
        <div className="bg-white text-center rounded p-5">
            <h1 className="mb-4">Prenez rendez-vous </h1>
            <form>
                <div className="row g-3">
                    <div className="col-12">
                        <textarea name="" id="" cols="60" rows="3" className="form-control bg-light border-0" placeholder="Décrire en quelque ligne votre malaise"></textarea>
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
                                type="date"
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
                                type="time"
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