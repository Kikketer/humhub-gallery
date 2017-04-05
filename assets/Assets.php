<?php

/**
 * @link https://www.humhub.org/
 * @copyright Copyright (c) 2015 HumHub GmbH & Co. KG
 * @license https://www.humhub.com/licences
 */

namespace humhub\modules\gallery\assets;

use yii\web\AssetBundle;

/**
 * The asset bundle for the gallery module.
 *
 * @package humhub.modules.gallery
 * @since 1.0
 * @author Sebastian Stumpf
 */
class Assets extends AssetBundle
{

    public $publishOptions = [
        'forceCopy' => true
    ];
    public $css = [
        'css/gallery.css',
    ];
    public $js = [
        'js/gallery.js',
    ];
    public $jsOptions = [
        'position' => \yii\web\View::POS_HEAD
    ];

    /**
     * @inheritdoc
     */
    public $sourcePath = '@gallery/resources';
}
