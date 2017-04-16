<?php

class <%= classPrefix %>Component extends CBitrixComponent {

    /**
     * @param $params array
     */
    public function onPrepareComponentParams($params) {
        $this->params = $params;
        return $this->params;
    }

    /**
     * @return array
     */
    public function executeComponent() {
        $this->includeComponentTemplate();
        return $this->arResult;
    }

}
