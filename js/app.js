document.addEventListener('DOMContentLoaded', () => {
    const stateModel = new StateModel();
    const dictModel = new DictModel(stateModel);
    const view = new AppView();

    const appController = new AppController(stateModel, dictModel, view);
    appController.init();
});
