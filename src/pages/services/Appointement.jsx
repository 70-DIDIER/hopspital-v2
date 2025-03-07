export default function Appointement() {
    return (
        <div className="bg-white text-center rounded p-5">
            <h1 className="mb-4">Prenez rendez-vous </h1>
            <form>
                <div className="row g-3">
                    <div className="col-12 col-sm-6">
                        <select className="form-select bg-light border-0" style={{height: 55}}>
                            <option selected>Choisir le type de consultation</option>
                            <option value="1"> Au cabinet</option>
                            <option value="2">En ligne</option>
                            <option value="3"> A domicile</option>
                        </select>
                    </div>
                    <div className="col-12 col-sm-6">
                        <select className="form-select bg-light border-0" style={{height: 55}}>
                            <option selected>Choisir votre Docteur</option>
                            <option value="1"> Dr Agbodaze</option>
                            <option value="2">Dr agbedomassi</option>
                            <option value="3">Dr Kodjo</option>
                        </select>
                    </div>


                    <div className="col-12">
                        <textarea name="" id="" cols="60" rows="3" className="form-control bg-light border-0" placeholder="Décrire en quelque ligne votre malaise"></textarea>
                    </div>
                    
                    <div className="col-12 col-sm-6">
                        <input
                            type="text"
                            className="form-control bg-light border-0"
                            placeholder="Votre nom complet"
                            style={{ height: 55 }}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <input
                            type="email"
                            className="form-control bg-light border-0"
                            placeholder="Votre email"
                            style={{ height: 55 }}
                        />
                    </div>
                    <div className="col-12 col-sm-12">
                        <div className="date" id="date" data-target-input="nearest">
                            <input
                                type="date"
                                className="form-control bg-light border-0 datetimepicker-input"
                                placeholder="La Date"
                                data-target="#date"
                                data-toggle="datetimepicker"
                                style={{ height: 55 }}
                            />
                        </div>
                    </div>
                    
                    <div className="col-12">
                        <button className="btn btn-primary w-100 py-3" type="submit">
                            Rendez vous
                        </button>
                    </div>
                </div>
            </form>
        </div>

    );
}